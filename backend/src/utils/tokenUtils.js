const db = require("../config/database");
const jwt = require('jsonwebtoken');

// 데이터베이스에서 제공된 리프래시 토큰의 유효성을 확인
async function verifyRefreshTokenInDatabase(token) {
    try {
        // 데이터베이스에서 토큰과 만료되지 않은 토큰을 조회
        const [rows] = await db.query("SELECT * FROM refresh_tokens WHERE token = ? AND expires_at > NOW()", [token]);

        // 토큰이 데이터베이스에 존재하고, 만료되지 않았다면 true를 반환
        return rows.length > 0;
    } catch (error) {
        console.error("리프래시 토큰 검증 중 오류 발생:", error);
        throw error; // 오류를 호출한 측으로 전파
    }
}

// 액세스 토큰 생성 함수
function generateAccessToken(user) {
    return jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '15m' });
}

// 리프래시 토큰 생성 함수
function generateRefreshToken(user) {
    return jwt.sign({ user_id: user.user_id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

// 모듈 내보내기
module.exports = {
    verifyRefreshTokenInDatabase,
    generateAccessToken,
    generateRefreshToken,
};