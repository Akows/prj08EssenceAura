const db = require('../config/database');

const saveRefreshToken = async (userId, refreshToken) => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7일 후 만료
  await db.query("INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES (?, ?, ?)", 
                 [userId, refreshToken, expiresAt]);
};

// 토큰 제거, 로그아웃 시 동작
const invalidateRefreshToken = async (userId) => {
  await db.query("DELETE FROM refresh_tokens WHERE user_id = ?", [userId]);
};

// 만료된 토큰을 자동으로 제거하는 함수 (아직 구현만 하고 호출한 곳은 없음)
const cleanUpExpiredTokens = async () => {
    await db.query("DELETE FROM refresh_tokens WHERE expires_at < NOW()");
  };

module.exports = {
  saveRefreshToken,
  invalidateRefreshToken,
  cleanUpExpiredTokens,
};
