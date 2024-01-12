const db = require("../config/database");

async function getUserAndTokenInfo(userId) {
    try {
        // 사용자가 관리자인지에 따라 다른 테이블에서 조회
        const userTable = isAdmin ? 'admins' : 'users';
        const userIdField = isAdmin ? 'admin_id' : 'user_id';
        const userQuery = `SELECT * FROM ${userTable} WHERE ${userIdField} = ?`;

        const [userRows] = await db.query(userQuery, [userId]);

        // 사용자가 존재하지 않는 경우
        if (userRows.length === 0) {
            return null;
        }

        const user = userRows[0];

        // 해당 사용자의 유효한 리프레시 토큰 조회
        const tokenQuery = `SELECT * FROM refresh_tokens WHERE ${userIdField} = ? AND expires_at > NOW()`;
        const [tokenRows] = await db.query(tokenQuery, [userId]);

        // 토큰 정보가 존재하는 경우
        const tokenInfo = tokenRows.length > 0 ? tokenRows[0] : null;

        return {
            user,
            token: tokenInfo
        };
    } catch (error) {
        console.error("데이터베이스 조회 중 오류 발생:", error);
        throw error;
    }
}

module.exports = {
    getUserAndTokenInfo
};
