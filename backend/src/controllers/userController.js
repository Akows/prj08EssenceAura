const db = require('../config/database');
const { validateSignupData } = require('../utils/validation');

exports.signup = (req, res) => {
    const { errors, isValid } = validateSignupData(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    // 데이터베이스 삽입 로직
    // ...
};
