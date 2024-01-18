const express = require('express');
const adminController = require('../controllers/adminController');
const { authenticateRefreshToken } = require('../middleware/authenticateToken');
const router = express.Router();

// 일반 회원 관리 라우트
router.get('/getusers', authenticateRefreshToken, adminController.getAllUsersHandler);
router.get('/searchUser/:id', authenticateRefreshToken, adminController.searchUserByEmailHandler);
router.put('/putusers/:id', authenticateRefreshToken, adminController.updateUserHandler);
router.patch('/patchusers/:id/deactivate', authenticateRefreshToken, adminController.deactivateUserHandler);

// 관리자 관리 라우트
router.get('/getadmins', authenticateRefreshToken, adminController.getAllAdminsHandler);
router.post('/postadmins', authenticateRefreshToken, adminController.createAdminHandler);
router.put('/putadmins/:id', authenticateRefreshToken, adminController.updateAdminHandler);
router.delete('/deleteadmins/:id', authenticateRefreshToken, adminController.deleteAdminHandler);

module.exports = router;
