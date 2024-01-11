const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);

// JWT 인증 시스템을 사용하는 라우트 (아직 미구현)
router.post('/wait..', authenticateToken, '/wait..');

module.exports = router;
