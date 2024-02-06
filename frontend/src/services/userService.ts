import { UserInfo, UserUpdateInfo } from '../type/usertypes';
import { fetchNewAccessToken } from './authService';

// 현재 로그인한 사용자의 정보를 가져오는 함수
export const getUserInfoInformation = async (
    accessToken: string | null
): Promise<UserInfo> => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/get-userinfo`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            credentials: 'include',
        }
    );

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
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/update-userinfo`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            credentials: 'include',
            body: JSON.stringify(userInfo),
        }
    );

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

// 사용자의 주문 내역을 가져오는 함수
export const getUserOrders = async (
    accessToken: string | null
): Promise<any> => {
    // 주문 정보 타입을 정확히 알 수 없으므로 any 타입을 사용하였습니다. 실제 타입이 정해지면 수정이 필요합니다.
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/get-orderinfo`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            credentials: 'include',
        }
    );

    if (response.status === 401 || response.status === 403) {
        const newAccessToken = await fetchNewAccessToken();
        if (newAccessToken) {
            return getUserOrders(newAccessToken);
        } else {
            throw new Error('새로운 액세스 토큰 발급 실패');
        }
    } else if (!response.ok) {
        throw new Error('주문 내역을 가져오지 못했습니다.');
    }

    return response.json();
};
