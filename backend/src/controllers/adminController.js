const { getAllUsers, searchUserByEmail, updateUser, deactivateUser, getAllAdmins, createAdmin, updateAdmin, deleteAdmin } = require("../service/adminService");

// 모든 유저 정보 조회
const getAllUsersHandler = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).send({ message: '유저 정보 조회 중 오류가 발생했습니다.' });
    }
};

// 특정 유저 정보 검색
const searchUserByEmailHandler = async (req, res) => {
    const emailKeyword = req.query.email;
    if (!emailKeyword) {
        return res.status(400).send({ message: '검색 키워드가 제공되지 않았습니다.' });
    }
    try {
        const users = await searchUserByEmail(emailKeyword);
        if (users.length === 0) {
            return res.status(404).send({ message: '검색 결과가 없습니다.' });
        }
        res.json(users);
    } catch (error) {
        res.status(500).send({ message: '이메일로 유저 검색 중 오류가 발생했습니다.' });
    }
};

// 유저 정보 수정
const updateUserHandler = async (req, res) => {
    try {
        await updateUser(req.params.id, req.body);
        res.send({ message: '유저 정보가 성공적으로 업데이트되었습니다.' });
    } catch (error) {
        res.status(500).send({ message: '유저 정보 업데이트 중 오류가 발생했습니다.' });
    }
};

// 유저 비활성화 (is_active = false)
const deactivateUserHandler = async (req, res) => {
    try {
        await deactivateUser(req.params.id);
        res.send({ message: '유저가 성공적으로 비활성화되었습니다.' });
    } catch (error) {
        res.status(500).send({ message: '유저 비활성화 중 오류가 발생했습니다.' });
    }
};

// 관리자 전체 조회
const getAllAdminsHandler = async (req, res) => {
    try {
        const admins = await getAllAdmins();
        res.json(admins);
    } catch (error) {
        res.status(500).send({ message: '관리자 정보 조회 중 오류가 발생했습니다.' });
    }
};

// 관리자 추가
const createAdminHandler = async (req, res) => {
    try {
        const admin = await createAdmin(req.body);
        res.status(201).json(admin);
    } catch (error) {
        res.status(500).send({ message: '관리자 추가 중 오류가 발생했습니다.' });
    }
};

// 관리자 정보 수정
const updateAdminHandler = async (req, res) => {
    try {
        await updateAdmin(req.params.id, req.body);
        res.send({ message: '관리자 정보가 성공적으로 업데이트되었습니다.' });
    } catch (error) {
        res.status(500).send({ message: '관리자 정보 수정 중 오류가 발생했습니다.' });
    }
};

// 관리자 삭제
const deleteAdminHandler = async (req, res) => {
    try {
        await deleteAdmin(req.params.id);
        res.send({ message: '관리자가 성공적으로 삭제되었습니다.' });
    } catch (error) {
        res.status(500).send({ message: '관리자 삭제 중 오류가 발생했습니다.' });
    }
};

module.exports = {
    getAllUsersHandler,
    searchUserByEmailHandler,
    updateUserHandler,
    deactivateUserHandler,
    getAllAdminsHandler,
    updateAdminHandler,
    createAdminHandler,
    deleteAdminHandler,
};
