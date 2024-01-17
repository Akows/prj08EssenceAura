const db = require("../config/database");
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const getUserAndTokenInfo = async (userId, isAdmin) => {
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

const getUserByEmail = async (email, isAdmin) => {
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

const validateUserPassword = async (email, password, isAdmin) => {
    const user = await getUserByEmail(email, isAdmin);
    if (!user) {
        return false;
    }

    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
}

// 회원 정보의 임시 저장
const createUserTemp = async (email) => {
    const tempPassword = 'tempPassword'; // 임의의 비밀번호
    const query = `
        INSERT INTO users (email, password, created_at, updated_at, is_active, is_verified)
        VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 0, 0)
    `;

    try {
        const result = await db.execute(query, [email, tempPassword]);
        const userId = result[0].insertId; // 삽입된 사용자의 ID를 반환하도록
        return userId;
    } catch (error) {
        console.error("임시 사용자 데이터 저장 중 오류 발생:", error);
        throw error;
    }
}
// 임시 회원정보의 삭제
const deleteTempUser = async (email) => {
    // 데이터베이스 연결 풀에서 연결을 가져옴
    const connection = await db.getConnection();
    try {
        // 트랜잭션 시작
        await connection.beginTransaction();

        // 먼저 email_verification 테이블에서 해당 이메일과 관련된 레코드를 삭제
        // 이 작업은 users 테이블의 레코드를 참조하는 외래 키 제약 조건을 해결하기 위함임
        const deleteEmailVerification = `DELETE FROM email_verification WHERE email = ?; `;
        await connection.query(deleteEmailVerification, [email]);

        // email_verification 테이블에서 레코드를 성공적으로 삭제한 후,
        // users 테이블에서 해당 이메일을 가진 사용자를 삭제
        // is_verified가 0인 사용자만 삭제하여 임시 사용자를 타겟팅함
        const deleteUser = `
            DELETE FROM users
            WHERE email = ? AND is_verified = 0;
        `;
        await connection.query(deleteUser, [email]);

        // 모든 쿼리가 성공적으로 실행되면 트랜잭션을 커밋함
        await connection.commit();
    } catch (error) {
        // 오류가 발생하면 트랜잭션을 롤백하여 데이터베이스의 일관성 유지
        await connection.rollback();
        console.error("임시 사용자 데이터 삭제 중 오류 발생:", error);
        throw error;
    } finally {
        // 작업이 완료되면 데이터베이스 연결을 풀로 반환
        connection.release();
    }
};



// 회원 정보의 최종 저장
const updateUser = async (email, userData) => {
    const { username, password, address, building_name, phone_number } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
        UPDATE users
        SET username = ?, password = ?, address = ?, building_name = ?, phone_number = ?, updated_at = CURRENT_TIMESTAMP, is_active = 1, is_verified = 1
        WHERE email = ?
    `;

    try {
        await db.execute(query, [username, hashedPassword, address, building_name, phone_number, email]);
    } catch (error) {
        console.error("사용자 데이터 업데이트 중 오류 발생:", error);
        throw error;
    }
}
// 주기적인 임시 사용자 데이터 삭제 로직
const cleanUpTempUsers = async () => {
    // 예: 인증받지 못한 사용자 데이터를 48시간 후에 삭제
    const query = `
        DELETE FROM users
        WHERE is_verified = 0 AND created_at < NOW() - INTERVAL 48 HOUR
    `;

    try {
        await db.execute(query);
        console.log('임시 사용자 데이터가 정리되었습니다.');
    } catch (error) {
        console.error('임시 사용자 데이터 정리 중 에러:', error);
    }
};


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
const checkEmailVerified = async (email) => {
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
const createVerificationCode = async (email, userId) => {
    // 인증 코드 생성 (예: 랜덤 문자열)
    const verificationCode = crypto.randomBytes(16).toString('hex');

    // 생성된 코드를 데이터베이스에 저장
    const insertQuery = `
        INSERT INTO email_verification (user_id, email, code, created_at, expires_at)
        VALUES (?, ?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY))
    `;
    await db.query(insertQuery, [userId, email, verificationCode]);

    return verificationCode;
};

// 인증 코드 검증 함수
const verifyVerificationCode = async (email, code) => {

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

// 비밀번호 재설정 요청 처리
const requestPasswordReset = async (email) => {
    // 사용자 이메일을 기반으로 사용자 ID 조회
    const [user] = await db.query("SELECT user_id FROM users WHERE email = ?", [email]);

    if (user.length === 0) {
        throw new Error('계정이 존재하지 않습니다.');
    }
    
    // 비밀번호 재설정 토큰 생성 및 저장
    const resetToken = await tokenService.savePasswordResetToken(user[0].user_id);
    
    // 이메일로 비밀번호 재설정 링크 전송
    await emailUtils.sendPasswordResetEmail(email, resetToken);
    
    return resetToken; // 이 토큰은 테스트 목적으로 반환하거나, 로그에 기록할 수 있습니다.
};
    
// 비밀번호 재설정 처리
const resetPassword = async (token, newPassword) => {
    const userId = await tokenService.verifyPasswordResetToken(token);

    if (!userId) {
        throw new Error('유효하지 않은 토큰입니다.');
    }
    
    // 새 비밀번호 해싱
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // 사용자의 비밀번호 업데이트
    await db.query("UPDATE users SET password = ? WHERE user_id = ?", [hashedPassword, userId]);
    
    // 사용한 비밀번호 재설정 토큰 무효화
    await tokenService.invalidatePasswordResetToken(token);
};

module.exports = {
    getUserAndTokenInfo,
    checkEmailAvailability,
    getUserByEmail,
    validateUserPassword,
    createUserTemp,
    deleteTempUser,
    updateUser,
    cleanUpTempUsers,
    findEmailByNameAndPhone,
    checkEmailVerified,
    createVerificationCode,
    verifyVerificationCode,
    requestPasswordReset,
    resetPassword,
};
