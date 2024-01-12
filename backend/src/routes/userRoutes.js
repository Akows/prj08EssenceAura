const express = require('express');
const userController = require('../controllers/userController');
const { authenticateRefreshToken } = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/signup', userController.signUpHandler);
router.post('/login', userController.loginHandler);
router.post('/logout', authenticateRefreshToken, userController.logoutHandler);
router.get('/check-auth', authenticateRefreshToken, userController.checkAuthHandler);

module.exports = router;
