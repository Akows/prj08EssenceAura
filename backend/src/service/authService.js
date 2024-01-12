const db = require("../config/database");

async function getUserAndTokenInfo(userId, isAdmin) {
    try {
        // isAdmin을 사용하여 적절한 테이블에서 사용자 정보 조회
        const userTable = isAdmin ? 'admins' : 'users';
        const userIdField = isAdmin ? 'admin_id' : 'user_id';
        const userQuery = `SELECT * FROM ${userTable} WHERE ${userIdField} = ?`;

        const [userRows] = await db.query(userQuery, [userId]);

        if (userRows.length === 0) {
            return null;
        }

        const user = userRows[0];

        // 리프래시 토큰 조회 로직은 여기서 생략(필요에 따라 추가)
        
        return { user };
    } catch (error) {
        console.error("데이터베이스 조회 중 오류 발생:", error);
        // 여기서 에러를 던지지 않고, 적절히 처리(예: null 반환)
        return null;
    }
}

module.exports = {
    getUserAndTokenInfo
};
