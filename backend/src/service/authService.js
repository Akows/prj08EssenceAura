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

// 아이디 중복 검사 함수.
const checkEmailAvailability = async (email) => {
    try {
        const query = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
        const [rows] = await db.query(query, [email]);
        return rows[0].count === 0; // 이메일이 없으면 true, 있으면 false 반환
    } catch (error) {
        console.error('이메일 중복 검사 DB 오류:', error);
        throw error;
    }
};

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

async function validateUserPassword(email, password, isAdmin) {
    const user = await getUserByEmail(email, isAdmin);
    if (!user) {
        return false;
    }

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
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

const findEmailByNameAndPhone = async (name, phone) => {
    try {
        const query = 'SELECT email FROM users WHERE username = ? AND phone_number = ?';
        const [users] = await db.query(query, [name, phone]);

        if (users.length > 0) {
            return users[0].email;
        } else {
            return null;
        }
    } catch (error) {
        console.error('이메일 찾기 중 오류 발생', error);
        throw error;
    }
};

// 이메일 인증 여부 확인 함수
exports.checkEmailVerified = async (email) => {
    const query = 'SELECT is_verified FROM users WHERE email = ?';
    const [results] = await db.query(query, [email]);

    // 이메일 주소가 존재하고 인증된 상태인지 확인
    if (results.length > 0 && results[0].is_verified) {
        return true;
    } else {
        return false;
    }
};

// 인증 코드 생성 및 저장 함수
exports.createVerificationCode = async (email) => {
    // 인증 코드 생성 (예: 랜덤 문자열)
    const verificationCode = require('crypto').randomBytes(16).toString('hex');

    // 생성된 코드를 데이터베이스에 저장
    const insertQuery = `
        INSERT INTO email_verification (email, code, created_at, expires_at)
        VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY))
    `;
    await db.query(insertQuery, [email, verificationCode]);

    return verificationCode;
};

// 인증 코드 검증 함수
exports.verifyVerificationCode = async (email, code) => {
    // 데이터베이스에서 인증 코드 확인
    const selectQuery = `
        SELECT * FROM email_verification
        WHERE email = ? AND code = ? AND expires_at > NOW()
    `;
    const [results] = await db.query(selectQuery, [email, code]);

    // 인증 코드가 데이터베이스에 존재하면 true 반환
    if (results.length > 0) {
        // 인증이 완료되면 해당 레코드 삭제
        const deleteQuery = `DELETE FROM email_verification WHERE email = ?`;
        await db.query(deleteQuery, [email]);

        // 사용자의 is_verified 상태를 true로 업데이트
        const updateQuery = `UPDATE users SET is_verified = 1 WHERE email = ?`;
        await db.query(updateQuery, [email]);

        return true;
    } else {
        return false;
    }
};

module.exports = {
    getUserAndTokenInfo,
    checkEmailAvailability,
    getUserByEmail,
    validateUserPassword,
    createUser,
    findEmailByNameAndPhone,
};
