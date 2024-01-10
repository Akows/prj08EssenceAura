import axios from 'axios';

const API_URL = '서버 API URL';

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

// 로그인, 로그아웃 등의 함수 구현
