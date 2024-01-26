import { UserInfo, UserUpdateInfo } from '../type/usertypes';
import { fetchNewAccessToken } from './authService';

const API_BASE_URL = 'http://localhost:3001/user';

// 현재 로그인한 사용자의 정보를 가져오는 함수
export const getUserInfoInformation = async (
    accessToken: string | null
): Promise<UserInfo> => {
    const response = await fetch(`${API_BASE_URL}/get-userinfo`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
    });

    // 401 또는 403 오류 처리
    if (response.status === 401 || response.status === 403) {
        const newAccessToken = await fetchNewAccessToken();
        if (newAccessToken) {
            return getUserInfoInformation(newAccessToken);
        } else {
            throw new Error('새로운 액세스 토큰 발급 실패');
        }
    } else if (!response.ok) {
        throw new Error('유저 정보를 가져오지 못했습니다.');
    }

    return response.json();
};

// 사용자 정보를 업데이트하는 함수
export const updateUserInfoInformation = async (
    userInfo: UserUpdateInfo,
    accessToken: string | null
): Promise<UserInfo> => {
    const response = await fetch(`${API_BASE_URL}/update-userinfo`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        credentials: 'include',
        body: JSON.stringify(userInfo),
    });

    // 401 또는 403 오류 처리
    if (response.status === 401 || response.status === 403) {
        const newAccessToken = await fetchNewAccessToken();
        if (newAccessToken) {
            return updateUserInfoInformation(userInfo, newAccessToken);
        } else {
            throw new Error('새로운 액세스 토큰 발급 실패');
        }
    } else if (!response.ok) {
        throw new Error('정보 업데이트 과정에서 에러가 발생했습니다.');
    }

    return response.json();
};
