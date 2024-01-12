const db = require("../config/database");
const bcrypt = require('bcrypt');

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

async function getUserByEmail(email, isAdmin) {
    const userTable = isAdmin ? 'admins' : 'users';
    const query = `SELECT * FROM ${userTable} WHERE email = ?`;

    try {
        const [rows] = await db.query(query, [email]);
        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        console.error("데이터베이스 조회 중 오류 발생:", error);
        throw error;
    }
}

async function createUser(userData) {
    const { username, email, password, address, building_name, phone_number } = userData;
   
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
        INSERT INTO users (username, email, password, address, building_name, phone_number, created_at, updated_at, is_active, is_member)
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1)
    `;

    try {
        await db.execute(query, [username, email, hashedPassword, address, building_name, phone_number]);
    } catch (error) {
        console.error("데이터베이스 삽입 중 오류 발생:", error);
        throw error;
    }
}

async function validateUserPassword(email, password, isAdmin) {
    const user = await getUserByEmail(email, isAdmin);
    if (!user) {
        return false;
    }

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
}


module.exports = {
    getUserAndTokenInfo,
    getUserByEmail,
    createUser,
    validateUserPassword,
};
