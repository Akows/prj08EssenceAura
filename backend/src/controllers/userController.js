const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateSignupData, validateLoginData } = require('../utils/authUtils');

const signup = async (req, res) => {

    // 입력된 데이터의 유효성 검사
    const errors = validateSignupData(req.body);
    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    // 유효성 검사를 통과한 경우, 데이터베이스에 사용자 추가
    try {
        const { username, email, password, address, building_name, phone_number } = req.body;

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

const login = async (req, res) => {
    // 로그인 데이터 유효성 검사
    const errors = validateLoginData(req.body);
    if (Object.keys(errors).length > 0) {
        return res.status(400).json(errors);
    }

    // 입력된 이메일로 사용자 조회
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    
    try {
        const [user] = await db.query(query, [email]);
        if (user) {
            // 비밀번호 비교
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                // JWT 생성
                const token = jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET, // .env 파일에 저장된 비밀키
                    { expiresIn: '2h' }
                );
                return res.json({ message: '로그인 성공', token });
            } else {
                return res.status(401).json({ message: '비밀번호가 틀립니다.' });
            }
        } else {
            return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
        }
    } catch (error) {
        console.error('로그인 처리 중 에러:', error);
        return res.status(500).json({ message: '서버 오류' });
    }
};

module.exports = {
    signup, login
};