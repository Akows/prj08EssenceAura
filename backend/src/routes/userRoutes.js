const express = require('express');
const authController = require('../controllers/authController');
const { authenticateRefreshToken } = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/signup', authController.signUpHandler);
router.post('/check-email', authController.checkEmailHandler);
router.post('/login', authController.loginHandler);
router.post('/logout', authenticateRefreshToken, authController.logoutHandler);
router.get('/check-auth', authenticateRefreshToken, authController.checkAuthHandler);

router.post('/find-email', authController.findEmail);

router.post('/verify-email', authController.sendVerificationEmail);
router.post('/verify-code', authController.verifyEmailCode);

module.exports = router;
