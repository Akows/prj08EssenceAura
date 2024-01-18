const express = require('express');
const adminController = require('../controllers/adminController');
const { authenticateRefreshToken } = require('../middleware/authenticateToken');
const router = express.Router();

// 일반 회원 관리 라우트
router.get('/getusers', authenticateRefreshToken, adminController.getAllUsers);
router.get('/searchUser/:id', authenticateRefreshToken, adminController.searchUserByEmail);
router.put('/putusers/:id', authenticateRefreshToken, adminController.updateUser);
router.patch('/patchusers/:id/deactivate', authenticateRefreshToken, adminController.deactivateUser);

// 관리자 관리 라우트
router.get('/getadmins', authenticateRefreshToken, adminController.getAllAdmins);
router.post('/postadmins', authenticateRefreshToken, adminController.createAdmin);
router.put('/putadmins/:id', authenticateRefreshToken, adminController.updateAdmin);
router.delete('/deleteadmins/:id', authenticateRefreshToken, adminController.deleteAdmin);

module.exports = router;
