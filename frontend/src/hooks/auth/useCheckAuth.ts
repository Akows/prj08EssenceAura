import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginFailure, loginSuccess } from '../../redux/slices/authSlice';

const useCheckAuth = () => {
    const dispatch = useDispatch();

    // 새로운 액세스 토큰을 재발급 받는 함수
    const fetchNewAccessToken = async () => {
        // 서버에 리프래시 토큰을 사용해 새로운 액세스 토큰을 요청
        const response = await fetch(
            'http://localhost:3001/auth/refresh-token',
            {
                method: 'GET',
                credentials: 'include', // 쿠키에 저장된 리프래시 토큰을 포함
            }
        );
        const data = await response.json();

        // 서버로부터 새로운 액세스 토큰을 정상적으로 받았다면 반환
        if (response.ok) {
            return data.accessToken;
        } else {
            // 새로운 액세스 토큰을 받지 못했다면, 오류를 발생
            throw new Error(data.message || '액세스 토큰 재발급 실패');
        }
    };

    // 사용자 인증 상태를 확인하는 함수
    const checkAuth = async () => {
        try {
            // 서버에 현재 사용자의 인증 상태를 확인하는 요청을 보냄
            const response = await fetch(
                'http://localhost:3001/auth/check-auth',
                {
                    method: 'GET',
                    credentials: 'include',
                }
            );
            const data = await response.json();

            // 인증 상태 확인이 성공적이라면,
            if (response.ok) {
                // 새로운 액세스 토큰을 요청
                const newAccessToken = await fetchNewAccessToken();

                // 새로운 토큰을 받았다면, Redux 스토어에 사용자 정보와 함께 저장합니다.
                if (newAccessToken) {
                    dispatch(
                        loginSuccess({
                            ...data.userInfo,
                            accessToken: newAccessToken,
                        })
                    );
                } else {
                    // 새로운 토큰을 받지 못했다면, 오류를 처리
                    dispatch(loginFailure('새로운 액세스 토큰 발급 실패'));
                }
            } else if (response.status === 401) {
                // 인증 실패(401)의 경우, 새로운 액세스 토큰을 요청
                await fetchNewAccessToken();
            } else {
                // 그 외의 경우, 오류 메시지를 Redux 스토어에 저장
                dispatch(loginFailure(data.message));
            }
        } catch (error) {
            // 요청 중 발생한 오류를 처리
            console.error('인증 확인 중 오류 발생:', error);
            dispatch(loginFailure('인증 확인 중 오류 발생'));
        }
    };

    // 컴포넌트 마운트 시 사용자 인증 상태를 확인
    useEffect(() => {
        checkAuth();
    }, [dispatch]);

    return null;
};

export default useCheckAuth;
