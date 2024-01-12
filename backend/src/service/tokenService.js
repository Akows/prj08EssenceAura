const db = require('../config/database');

const saveRefreshToken = async (userId, refreshToken, isAdmin) => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7일 후 만료

  // isAdmin에 따라 user_id 또는 admin_id 컬럼에 값을 저장
  const column = isAdmin ? 'admin_id' : 'user_id';
  await db.query(`INSERT INTO refresh_tokens (${column}, token, expires_at, is_admin) VALUES (?, ?, ?, ?)`, 
                 [userId, refreshToken, expiresAt, isAdmin]);
};

// 리프레시 토큰 무효화 함수
const invalidateRefreshToken = async (userId, isAdmin) => {

  console.log(userId, isAdmin);

  // isAdmin에 따라 user_id 또는 admin_id 컬럼을 사용하여 토큰을 삭제
  const column = isAdmin ? 'admin_id' : 'user_id';
  await db.query(`DELETE FROM refresh_tokens WHERE ${column} = ?`, [userId]);
};

// 만료된 토큰을 자동으로 제거하는 함수
const cleanUpExpiredTokens = async () => {
  await db.query("DELETE FROM refresh_tokens WHERE expires_at < NOW()");
};

module.exports = {
  saveRefreshToken,
  invalidateRefreshToken,
  cleanUpExpiredTokens,
};
