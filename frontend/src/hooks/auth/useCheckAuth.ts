import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginSuccess } from '../../redux/slices/authSlice';
import { RootState } from '../../redux/store';
import { fetchNewAccessToken } from '../../services/authService';

const useCheckAuth = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector(
        (state: RootState) => state.auth.accessToken
    );

    // 사용자 인증 상태를 확인하는 함수
    const checkAuth = async () => {
        try {
            const response = await fetch(
                'http://localhost:3001/auth/check-auth',
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // 액세스 토큰을 헤더에 포함
                    },
                    credentials: 'include',
                }
            );

            if (response.ok) {
                const data = await response.json();
                dispatch(
                    loginSuccess({
                        ...data.userInfo,
                        accessToken: accessToken, // 현재 액세스 토큰 사용
                    })
                );
            } else if (response.status === 401) {
                // 인증 실패 시 새로운 액세스 토큰 요청
                const newAccessToken = await fetchNewAccessToken();
                if (newAccessToken) {
                    // 새로운 액세스 토큰으로 다시 인증 상태 확인
                    checkAuth();
                } else {
                    dispatch(loginFailure('새로운 액세스 토큰 발급 실패'));
                }
            } else {
                const data = await response.json();
                dispatch(loginFailure(data.message));
            }
        } catch (error) {
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
