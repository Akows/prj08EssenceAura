const db = require('../config/database');
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
        
        // 비밀번호 해싱을 여기서 수행해야 함 (bcrypt 등을 사용)
        // const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users (username, email, password, address, building_name, phone_number) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [username, email, password, address, building_name, phone_number], (err, results) => {
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