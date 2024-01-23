const db = require('../config/database');
const bcrypt = require('bcrypt');

// 모든 유저 정보 조회
const getAllUsers = async () => {
    try {
        const [users] = await db.query('SELECT user_id, username, email, address, phone_number, created_at, is_active FROM users WHERE is_active = 1');
        return users;
    } catch (error) {
        throw new Error('유저 정보 조회 중 데이터베이스 오류가 발생했습니다.');
    }
};

// 특정 유저 정보 검색
const searchUserByEmail = async (emailKeyword) => {
    try {
        // '%' 와일드카드를 사용하여 부분 일치 검색을 합니다.
        const query = `SELECT * FROM users WHERE email LIKE ? AND is_active = 1`;
        const values = [`%${emailKeyword}%`];
        const [users] = await db.query(query, values);
        return users;
    } catch (error) {
        throw new Error('이메일로 유저 검색 중 데이터베이스 오류가 발생했습니다.');
    }
};

// 유저 정보 수정
const updateUser = async (userId, userData) => {
    try {
        await db.query('UPDATE users SET ? WHERE user_id = ?', [userData, userId]);
    } catch (error) {
        throw new Error('유저 정보 업데이트 중 데이터베이스 오류가 발생했습니다.');
    }
};

// 유저 비활성화 (is_active = false)
const deactivateUser = async (userId) => {
    try {
        await db.query('UPDATE users SET is_active = 0 WHERE user_id = ?', [userId]);
    } catch (error) {
        throw new Error('유저 비활성화 중 데이터베이스 오류가 발생했습니다.');
    }
};

// 관리자 전체 조회
const getAllAdmins = async () => {
    try {
        const [admins] = await db.query('SELECT admin_id, username, email, created_at FROM admins');
        return admins;
    } catch (error) {
        throw new Error('관리자 정보 조회 중 데이터베이스 오류가 발생했습니다.');
    }
};

// 관리자 추가
const createAdmin = async (adminData) => {
    // 먼저 데이터베이스에서 이메일 주소가 이미 사용 중인지 확인합니다.
    const [existingAdmins] = await db.query('SELECT * FROM admins WHERE email = ?', [adminData.email]);
    if (existingAdmins.length > 0) {
        throw new Error('이미 사용 중인 이메일 주소입니다.');
    }

    // 이메일 주소가 중복되지 않았다면, 관리자 계정을 생성합니다.
    const hashedPassword = await bcrypt.hash(adminData.password, 10);
    try {
        const [result] = await db.query('INSERT INTO admins (username, email, password, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW());', [adminData.username, adminData.email, hashedPassword]);
        await db.query('SELECT * FROM admins WHERE admin_id = ?', [result.insertId]);
    } catch (error) {
        throw new Error('관리자 추가 중 데이터베이스 오류가 발생했습니다.');
    }
};

// 관리자 정보 수정
const updateAdmin = async (adminId, adminData) => {
    try {
        await db.query('UPDATE admins SET ? WHERE admin_id = ?', [adminData, adminId]);
    } catch (error) {
        throw new Error('관리자 정보 수정 중 데이터베이스 오류가 발생했습니다.');
    }
};

// 관리자 삭제
const deleteAdmin = async (adminId) => {
    try {
        await db.query('DELETE FROM admins WHERE admin_id = ?', [adminId]);
    } catch (error) {
        throw new Error('관리자 삭제 중 데이터베이스 오류가 발생했습니다.');
    }
};

// 상품 목록을 가져오는 서비스 함수
const getProducts = async () => {
    try {
        // 데이터베이스 쿼리를 실행하여 상품 목록을 가져온다.
        const products = await db.query('SELECT * FROM products');
        return products;
    } catch (error) {
        throw error;
    }
};

// 상품을 추가하는 서비스 함수
const addProduct = async (productData) => {
    try {
        // 새 상품 데이터를 데이터베이스에 추가.
        const result = await db.query('INSERT INTO products SET ?', productData);
        return { id: result.insertId, ...productData };
    } catch (error) {
        throw error;
    }
};

// 상품 정보를 수정하는 서비스 함수
const updateProduct = async (id, productData) => {
    try {
        // 상품 ID를 기준으로 상품 정보를 업데이트.
        await db.query('UPDATE products SET ? WHERE product_id = ?', [productData, id]);
        return { id, ...productData };
    } catch (error) {
        throw error;
    }
};

// 상품을 삭제하는 서비스 함수
const deleteProduct = async (id) => {
    try {
        // 상품 ID를 기준으로 상품을 삭제.
        await db.query('DELETE FROM products WHERE product_id = ?', id);
    } catch (error) {
        throw error;
    }
};


// 내보내기
module.exports = {
    getAllUsers,
    searchUserByEmail,
    updateUser,
    deactivateUser,
    getAllAdmins,
    createAdmin,
    updateAdmin,
    deleteAdmin,
    getProducts,
    addProduct, 
    updateProduct,
    deleteProduct,
};