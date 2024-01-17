const db = require('../config/database');

const getUserInfo = async (userId) => {
    const result = await db.query('SELECT * FROM users WHERE user_id = ?', [userId]);
    return result[0]; // 사용자 정보 반환
};

const updateUserInfo = async (userId, updateData) => {
    await db.query('UPDATE users SET ? WHERE user_id = ?', [updateData, userId]);
    // 업데이트된 정보를 반환하지 않고, 성공 메시지만 반환합니다.
};

module.exports = {
    getUserInfo,
    updateUserInfo,
};
