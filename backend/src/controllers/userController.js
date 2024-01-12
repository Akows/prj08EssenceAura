const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateSignupData, validateLoginData } = require('../utils/authUtils');
const { verifyRefreshTokenInDatabase, generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');
const { saveRefreshToken, invalidateRefreshToken } = require('../service/tokenService');
const { getUserAndTokenInfo, createUser, validateUserPassword } = require('../service/authService');

// 회원가입 처리 함수
const signUpHandler = async (req, res) => {
    const errors = validateSignupData(req.body);
    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    try {
        const userId = await createUser(req.body);
        return res.status(201).json({ message: '회원가입 성공', userId });
    } catch (error) {
        console.error('회원가입 처리 중 에러:', error);
        return res.status(500).json({ message: '회원가입 처리 중 에러 발생' });
    }
};

// 로그인 처리 함수
const loginHandler = async (req, res) => {
    const errors = validateLoginData(req.body);
    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    try {
        const { email, password, isAdmin } = req.body;
        const user = await validateUserPassword(email, password);

        if (!user) {
            return res.status(401).json({ message: '비밀번호가 틀립니다.' });
        }

        const accessToken = generateAccessToken({ id: user.id, isAdmin });
        const refreshToken = generateRefreshToken({ id: user.id, isAdmin });

        await saveRefreshToken(user.id, refreshToken, isAdmin);

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        return res.json({
            message: '로그인 성공',
            accessToken,
            userInfo: {
                id: user.id,
                email: user.email,
                username: user.username,
                isAdmin
            },
        });
    } catch (error) {
        console.error('로그인 처리 중 에러:', error);
        return res.status(500).json({ message: '서버 오류' });
    }
};

// 리프레시 토큰을 기반으로 액세스 토큰을 재발급하는 기능
const refreshTokenHandler = async (req, res) => {
    const refreshToken = req.body.token;

    if (!refreshToken) {
        return res.status(401).json({ message: '리프레시 토큰이 필요합니다.' });
    }

    try {
        const isValid = await verifyRefreshTokenInDatabase(refreshToken);
        if (!isValid) {
            return res.status(403).json({ message: '유효하지 않은 리프레시 토큰입니다.' });
        }

        // 리프레시 토큰에 저장된 사용자 정보를 추출합니다 (예: 사용자 ID와 관리자 여부)
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: '리프레시 토큰이 만료되었거나 유효하지 않습니다.' });
            }

            // 새로운 액세스 토큰 생성
            const newAccessToken = generateAccessToken({
                id: user.id,
                isAdmin: user.isAdmin
            });
            res.json({ accessToken: newAccessToken });
        });
    } catch (error) {
        console.error('리프레시 토큰 처리 중 오류 발생:', error);
        res.status(500).json({ message: '서버 오류' });
    }
};

// 로그아웃 핸들러
const logoutHandler = async (req, res) => {
    try {
        const refreshToken = req.cookies['refreshToken'];

        if (!refreshToken) {
            return res.status(401).json({ message: '로그아웃을 위한 토큰이 없습니다.' });
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const userId = decoded.id;
        const isAdmin = decoded.isAdmin;

        res.cookie('refreshToken', '', { expires: new Date(0) });
        await invalidateRefreshToken(userId, isAdmin);
        res.json({ message: '로그아웃 되었습니다.' });
    } catch (error) {
        console.error('로그아웃 처리 중 오류:', error);
        res.status(500).json({ message: '서버 오류' });
    }
};

const checkAuthHandler = async (req, res) => {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) {
        return res.status(401).json({ message: '인증되지 않음' });
    }

    try {
        // 리프래시 토큰을 디코딩하여 사용자 ID와 isAdmin 값을 추출
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const userId = decoded.id;
        const isAdmin = decoded.isAdmin;

        // getUserAndTokenInfo 함수 호출 시 isAdmin을 인자로 전달
        const { user } = await getUserAndTokenInfo(userId, isAdmin);

        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없음' });
        }

        return res.json({ user });
    } catch (err) {
        return res.status(401).json({ message: '인증되지 않음' });
    }
};

module.exports = {
    signUpHandler, loginHandler, refreshTokenHandler, logoutHandler, checkAuthHandler
};