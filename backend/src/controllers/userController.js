const jwt = require('jsonwebtoken');
const { getUserInfo, updateUserInfo } = require('../service/userService');

// 유저 정보 조회 핸들러
const getUserInfoHandler = async (req, res) => {
    try {
        // 쿠키에서 리프레시 토큰 추출
        const refreshToken = req.cookies['refreshToken'];
        // 리프레시 토큰을 디코드하여 사용자 ID 추출
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const userId = decoded.id;

        // 사용자 정보 조회
        const userInfo = await getUserInfo(userId);
        // 조회된 사용자 정보 응답
        res.json(userInfo);
    } catch (error) {
        // 오류 발생 시 서버 오류 응답
        res.status(500).send(error.message);
    }
};

// 유저 정보 업데이트 핸들러
const updateUserInfoHandler = async (req, res) => {
    try {
        // 쿠키에서 리프레시 토큰 추출
        const refreshToken = req.cookies['refreshToken'];
        // 리프레시 토큰을 디코드하여 사용자 ID 추출
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const userId = decoded.id;

        // 요청 본문에서 업데이트할 데이터 추출
        const updateData = req.body;
        // 사용자 정보 업데이트
        await updateUserInfo(userId, updateData);
        // 성공 응답 전송
        res.json({ message: '유저 정보가 업데이트 되었습니다.' });
    } catch (error) {
        // 오류 발생 시 서버 오류 응답
        res.status(500).send(error.message);
    }
};

module.exports = {
    getUserInfoHandler,
    updateUserInfoHandler,
};
