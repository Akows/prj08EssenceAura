const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateSignupData, validateLoginData } = require('../utils/authUtils');
const { verifyRefreshTokenInDatabase, generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');
const { saveRefreshToken, invalidateRefreshToken } = require('../service/tokenService');

const signup = async (req, res) => {

    // 입력된 데이터의 유효성 검사
    const errors = validateSignupData(req.body);
    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    // 유효성 검사를 통과한 경우, 데이터베이스에 사용자 추가
    try {
        const { username, email, password, address, building_name, phone_number } = req.body;

        // password 필드에 직접 평문 비밀번호를 저장하는 것은 보안상 좋지 않다
        // 따라서 비밀번호는 해싱하여 저장
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
        INSERT INTO users (
            username, email, password, address, building_name, phone_number, 
            created_at, updated_at, is_active, is_member
        ) VALUES (
            ?, ?, ?, ?, ?, ?, 
            CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?, ?
        )
    `;

        db.query(query, [username, email, hashedPassword, address, building_name, phone_number, 1, 1], (err, results) => {
            if (err) {
                // 데이터베이스 에러 처리
                console.error('회원가입 중 데이터베이스 에러:', err);
                return res.status(500).json({ message: '데이터베이스 에러' });
            }
            // 회원가입 성공 응답
            res.status(201).json({ message: '회원가입 성공', userId: results.insertId });
        });
    } catch (error) {
        // 기타 에러 처리
        console.error('회원가입 처리 중 에러:', error);
        res.status(500).json({ message: '회원가입 처리 중 에러 발생' });
    }
};

const login = async (req, res) => {

    // 로그인 데이터 유효성 검사
    const errors = validateLoginData(req.body);
    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    // 클라이언트로부터 받은 데이터
    const { email, password, isAdmin } = req.body;

    // 관리자 로그인인지 여부에 따라 테이블과 컬럼을 선택
    const userTable = isAdmin ? 'admins' : 'users';
    const userIdField = isAdmin ? 'admin_id' : 'user_id';

    // 올바른 테이블을 사용하기 위해 쿼리 업데이트
    const query = `SELECT * FROM ${userTable} WHERE email = ?`;
    
    try {
        // db.query는 배열을 반환: [rows, fields]
        const [rows] = await db.query(query, [email]);

        // rows는 조회된 사용자 정보를 담은 배열. rows[0]은 첫 번째 사용자
        // 이메일은 유니크한 값으로 회원가입 단계에서 중복을 허가하지 않음. 따라서 index 0이 원하는 목표 데이터
        const user = rows[0];

        // 사용자가 데이터베이스에서 발견되고, 해시된 비밀번호도 존재하는지 확인
        if (user && user.password) {
            // 비밀번호 비교
            const isMatch = await bcrypt.compare(password, user.password);
            
            // 비밀번호가 일치하면..
            if (isMatch) {

                // 액세스 토큰과 리프래시 토큰 생성
                const accessToken = generateAccessToken({ id: user[userIdField], isAdmin });
                const refreshToken = generateRefreshToken({ id: user[userIdField], isAdmin });

                // 리프레시 토큰을 데이터베이스에 저장
                await saveRefreshToken(user[userIdField], refreshToken, isAdmin);

                // 리프레시 토큰을 httpOnly 쿠키로 클라이언트에 전달
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production', // 실제 운영 환경에서만 secure 쿠키 설정
                    sameSite: 'strict', // CSRF 공격 방지
                    path: '/', // 이 경로로 설정된 요청에 대해서만 쿠키를 포함해서 보냄
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 쿠키 만료 기간 설정 (7일)
                });

                // 클라이언트에 토큰들을 반환
                return res.json({
                    message: '로그인 성공',
                    accessToken,
                    userInfo: {
                        id: user[userIdField],
                        email: user.email,
                        username: user.username,
                        isAdmin // 관리자 여부도 함께 전달
                        // 추가적인 필요한 사용자 정보 필드 (비밀번호나 민감한 정보 제외)
                    },
                });
            } else {
                // 비밀번호가 일치하지 않으면..
                return res.status(401).json({ message: '비밀번호가 틀립니다.' });
            }
        } else {
            // 사용자를 찾을 수 없거나 비밀번호 필드가 없으면..
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }
    } catch (error) {
        // 로그인 처리 중 예외 발생!
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

        console.log(decoded);
        console.log(userId, isAdmin);

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
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const userId = decoded.id;

        const { user } = await getUserAndTokenInfo(userId);

        if (!user) {
            return res.status(404).json({ message: '사용자를 찾을 수 없음' });
        }

        return res.json({ user });
    } catch (err) {
        return res.status(401).json({ message: '인증되지 않음' });
    }
};

module.exports = {
    signup, login, refreshTokenHandler, logoutHandler, checkAuthHandler
};