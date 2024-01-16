const jwt = require('jsonwebtoken');
const { validateSignupData, validateLoginData } = require('../utils/authUtils');
const { verifyRefreshTokenInDatabase, generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');
const { saveRefreshToken, invalidateRefreshToken } = require('../service/tokenService');
const { getUserAndTokenInfo, validateUserPassword, checkEmailAvailability, findEmailByNameAndPhone, createVerificationCode, verifyVerificationCode, checkEmailVerified, createUserTemp, deleteTempUser, getUserByEmail, updateUser, requestPasswordReset, resetPassword } = require('../service/authService');
const sendEmail = require('../utils/emailUtils');

// 회원가입 처리 함수
const signUpHandler = async (req, res) => {
    const errors = validateSignupData(req.body);
    const email_Address = req.body.email;

    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    try {
        // 이메일 인증 여부 확인
        const isEmailVerified = await checkEmailVerified(email_Address);
        if (!isEmailVerified) {
            return res.status(400).json({ message: '이메일 인증이 완료되어야 합니다.' });
        }

        // 이메일 변경 감지
        const originalUserData = await getUserByEmail(email_Address);
        if (originalUserData && originalUserData.is_verified && originalUserData.email !== email_Address) {
            return res.status(400).json({ message: '이메일 주소가 변경되었습니다. 새 이메일 주소로 인증을 받아야 합니다.' });
        }

        // 인증 확인 후 나머지 회원 정보 업데이트
        await updateUser(email_Address, req.body);
        return res.status(201).json({ message: '회원가입 성공' });
    } catch (error) {
        console.error('회원가입 처리 중 에러:', error);
        return res.status(500).json({ message: '회원가입 처리 중 에러 발생' });
    }
};

// 회원가입 취소 처리 함수
const cancelSignUpHandler = async (req, res) => {
    const { email } = req.body;

    try {
        await deleteTempUser(email);
        res.json({ message: '회원가입 절차가 취소되었습니다.' });
    } catch (error) {
        console.error('회원가입 취소 처리 중 에러:', error);
        res.status(500).json({ message: '회원가입 취소 중 오류가 발생했습니다.' });
    }
};

// 아이디 중복 검사 함수
const checkEmailHandler = async (req, res) => {
    try {
        const { email } = req.body;
        const isAvailable = await checkEmailAvailability(email);

        if (!isAvailable) {
            return res.status(400).json({ message: '이미 사용 중인 이메일입니다.' });
        };

        res.json({ isAvailable });
    } catch (error) {
        console.error('이메일 중복 검사 중 오류:', error);
        res.status(500).send('서버 오류 발생');
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
        const user = await validateUserPassword(email, password, isAdmin);

        if (!user) {
            return res.status(401).json({ message: '비밀번호가 틀립니다.' });
        }

        // 관리자인지 여부에 따라 올바른 ID 필드 사용
        const userId = isAdmin ? user.admin_id : user.user_id;
        const accessToken = generateAccessToken({ id: userId, isAdmin });
        const refreshToken = generateRefreshToken({ id: userId, isAdmin });

        await saveRefreshToken(userId, refreshToken, isAdmin);

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

// 이메일 찾기 기능 함수
const findEmail = async (req, res) => {
    try {
        const { name, phone } = req.body;
        const email = await findEmailByNameAndPhone(name, phone);

        if (email) {
            res.json({ email });
        } else {
            res.status(404).json({ message: '일치하는 사용자가 없습니다.' });
        }
    } catch (error) {
        console.error('Error in findEmail:', error);
        res.status(500).json({ message: '서버 오류가 발생했습니다.' });
    }   
};

// 인증 이메일 발송 로직
const sendVerificationEmail = async (req, res) => {
    const { email } = req.body;
    try {
        // 이메일 주소로 임시 회원 데이터 생성
        const userId = await createUserTemp(email);

        const verificationCode = await createVerificationCode(email, userId);
        await sendEmail({
            from: process.env.EMAIL_USERNAME,
            to: email,
            subject: '이메일 인증',
            html: `<h1>이메일 인증 코드입니다: ${verificationCode}</h1> 
            <p>앱에서 이 코드를 입력하여 이메일 인증을 완료해주세요.</p> 
            `});

        res.status(200).json({ message: '인증 이메일을 발송했습니다.' });
    } catch (error) {
        console.error('인증 이메일 발송 중 에러:', error);
        res.status(500).json({ message: '이메일 발송 중 오류가 발생했습니다.' });
    }
};

// 인증 코드 검증 로직
const verifyEmailCode = async (req, res) => {
    const { email, code } = req.body;
    try {
        const isVerified = await verifyVerificationCode(email, code);

    if (isVerified) {
        res.status(200).json({ message: '이메일이 성공적으로 인증되었습니다.' });
    } else {
        res.status(400).json({ message: '잘못된 인증 코드입니다.' });
    }
    } catch (error) {
        console.error('인증 코드 검증 중 에러:', error);
        res.status(500).json({ message: '인증 코드 검증 중 오류가 발생했습니다.' });
    }
};

// 클라이언트로부터의 비밀번호 재설정 요청을 처리하는 핸들러
const requestPasswordResetHandler = async (req, res) => {
    try {
        const { email } = req.body;
        await requestPasswordReset(email);
        res.status(200).send('Password reset email sent.');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
    
    // 클라이언트가 제출한 토큰과 새 비밀번호로 비밀번호 재설정을 처리하는 핸들러
const resetPasswordHandler = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        await resetPassword(token, newPassword);
        res.status(200).send('Password has been reset successfully.');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    signUpHandler,
    cancelSignUpHandler,
    checkEmailHandler, 
    loginHandler, 
    refreshTokenHandler, 
    logoutHandler, 
    checkAuthHandler, 
    findEmail,
    sendVerificationEmail,
    verifyEmailCode,
    requestPasswordResetHandler,
    resetPasswordHandler,
};