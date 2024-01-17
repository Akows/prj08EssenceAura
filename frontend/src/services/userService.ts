import { UserUpdateInfo } from '../type/usertypes';

const API_BASE_URL = 'http://localhost:3001/api';

// 현재 로그인한 사용자의 정보를 가져오는 함수
export const getUserInfoInformation = async () => {
    const response = await fetch(`${API_BASE_URL}/get-userinfo`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // 쿠키를 포함시키기 위한 설정
    });

    if (!response.ok) {
        throw new Error('유저 정보를 가져오지 못했습니다.');
    }

    return response.json();
};

// 사용자 정보를 업데이트하는 함수
export const updateUserInfoInformation = async (userInfo: UserUpdateInfo) => {
    const response = await fetch(`${API_BASE_URL}/update-userinfo`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // 쿠키를 포함시키기 위한 설정
        body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
        throw new Error('정보 업데이트 과정에서 에러가 발생했습니다.');
    }

    return response.json();
};
