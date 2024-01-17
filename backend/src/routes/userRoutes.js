const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateRefreshToken } = require('../middleware/authenticateToken');

// 유저 정보 조회
router.get('/get-userinfo', authenticateRefreshToken, userController.getUserInfoHandler);

// 유저 정보 수정
router.put('/update-userinfo', authenticateRefreshToken, userController.updateUserInfoHandler);

module.exports = router;