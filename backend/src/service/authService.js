const db = require("../config/database");

async function getUserAndTokenInfo(userId) {
    try {
        // 사용자 정보 조회
        const userQuery = "SELECT * FROM users WHERE user_id = ?";
        const [userRows] = await db.query(userQuery, [userId]);

        // 사용자가 존재하지 않는 경우
        if (userRows.length === 0) {
            return null;
        }

        const user = userRows[0];

        // 해당 사용자의 유효한 리프레시 토큰 조회
        const tokenQuery = "SELECT * FROM refresh_tokens WHERE user_id = ? AND expires_at > NOW()";
        const [tokenRows] = await db.query(tokenQuery, [userId]);

        // 토큰 정보가 존재하는 경우
        const tokenInfo = tokenRows.length > 0 ? tokenRows[0] : null;

        return {
            user,
            token: tokenInfo
        };
    } catch (error) {
        console.error("데이터베이스 조회 중 오류 발생:", error);
        throw error; // 오류를 호출한 측으로 전파
    }
}

module.exports = {
    getUserAndTokenInfo
};
