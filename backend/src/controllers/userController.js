const db = require('../config/database');
const bcrypt = require('bcrypt');
const { validateSignupData } = require('../utils/authUtils');

const signup = async (req, res) => {
    // 입력된 데이터의 유효성 검사
    const errors = validateSignupData(req.body);
    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    // 유효성 검사를 통과한 경우, 데이터베이스에 사용자 추가
    try {
        const { username, email, password, address, building_name, phone_number } = req.body;

        console.log('회원가입 절차 진행중..');
        
        // password 필드에 직접 평문 비밀번호를 저장하는 것은 보안상 좋지 않다
        // 따라서 비밀번호는 해싱하여 저장
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
        INSERT INTO users (
            username, email, password, address, building_name, phone_number, 
            created_at, updated_at, is_active, is_member
        ) VALUES (
            ?, ?, ?, ?, ?, ?, 
            CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?, ?
        )
    `;

        db.query(query, [username, email, hashedPassword, address, building_name, phone_number, 1, 1], (err, results) => {
            if (err) {
                // 데이터베이스 에러 처리
                console.error('회원가입 중 데이터베이스 에러:', err);
                return res.status(500).json({ message: '데이터베이스 에러' });
            }
            // 회원가입 성공 응답
            res.status(201).json({ message: '회원가입 성공', userId: results.insertId });
        });
    } catch (error) {
        // 기타 에러 처리
        console.error('회원가입 처리 중 에러:', error);
        res.status(500).json({ message: '회원가입 처리 중 에러 발생' });
    }
};

module.exports = {
    signup
};