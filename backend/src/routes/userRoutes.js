const express = require('express');
const userController = require('../controllers/userController');
const { authenticateRefreshToken } = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', authenticateRefreshToken, userController.logoutHandler);
router.post('/check-auth', authenticateRefreshToken, userController.checkAuthHandler);

module.exports = router;
