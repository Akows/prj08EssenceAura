const express = require('express');
const authController = require('../controllers/authController');
const { authenticateRefreshToken } = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/signup', authController.signUpHandler);
router.post('/check-email', authController.checkEmailHandler);
router.post('/login', authController.loginHandler);
router.post('/logout', authenticateRefreshToken, authController.logoutHandler);
router.get('/check-auth', authenticateRefreshToken, authController.checkAuthHandler);

router.post('/find-email', authController.findEmailHandler);

// 이메일 인증 발송 라우트
router.post('/verify-email', authController.sendVerificationEmailHandler);

// 이메일 인증 코드 검증 라우트
router.post('/verify-code', authController.verifyEmailCodeHandler);

// 회원가입 취소 라우트
router.post('/cancel-signup', authController.cancelSignUpHandler);

// 비밀번호 재설정 이메일 인증 코드 발송
router.post('/password-reset/request', authController.sendPasswordResetEmailHandler);

// 비밀번호 재설정 - 인증 코드 검증 및 비밀번호 변경
router.post('/password-reset/verify', authController.verifyAndResetPasswordHandler);

module.exports = router;
