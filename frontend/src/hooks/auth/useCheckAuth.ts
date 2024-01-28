import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginSuccess } from '../../redux/slices/authSlice';
import { RootState } from '../../redux/store';
import {
    checkAuthStatus,
    fetchNewAccessToken,
} from '../../services/authService';

const useCheckAuth = () => {
    const dispatch = useDispatch();
    // Redux Store에서 현재 저장된 액세스 토큰을 가져옵니다.
    const accessToken = useSelector(
        (state: RootState) => state.auth.accessToken
    );

    // 사용자 인증 상태를 확인하는 비동기 함수입니다.
    const checkAuth = async () => {
        try {
            // 초기 액세스 토큰으로 서버에 인증 상태 확인 요청을 보냅니다.
            let currentAccessToken = accessToken;
            let response = await checkAuthStatus(currentAccessToken);

            // 성공적으로 인증되었을 경우, 로그인 상태를 Redux Store에 저장합니다.
            if (response.ok) {
                const data = await response.json();
                dispatch(
                    loginSuccess({
                        ...data.userInfo,
                        accessToken: currentAccessToken,
                    })
                );
                return;
            }

            // 액세스 토큰이 유효하지 않을 경우 (401 Unauthorized 또는 403 Forbidden), 새로운 액세스 토큰을 요청합니다.
            if (response.status === 401 || response.status === 403) {
                const newAccessToken = await fetchNewAccessToken();

                // 새로운 토큰 발급에 실패했을 경우, 로그인 실패 상태를 Redux Store에 저장합니다.
                if (!newAccessToken) {
                    dispatch(loginFailure('새로운 액세스 토큰 발급 실패'));
                    return;
                }

                // 새로운 토큰으로 다시 인증 상태 확인을 시도합니다.
                currentAccessToken = newAccessToken;
                response = await checkAuthStatus(currentAccessToken);

                // 새로운 토큰으로 인증에 성공했을 경우, 로그인 상태를 Redux Store에 저장합니다.
                if (response.ok) {
                    const data = await response.json();
                    dispatch(
                        loginSuccess({
                            ...data.userInfo,
                            accessToken: currentAccessToken,
                        })
                    );
                    return;
                } else {
                    // 새로 발급받은 토큰으로도 인증 실패시, 로그인 실패 상태를 Redux Store에 저장합니다.
                    dispatch(loginFailure('인증 실패'));
                    return;
                }
            }

            // 기타 오류가 발생했을 경우, 오류 메시지를 Redux Store에 저장합니다.
            const data = await response.json();
            dispatch(loginFailure(data.message));
        } catch (error) {
            // 요청 중 발생한 오류를 콘솔에 기록하고, 로그인 실패 상태를 Redux Store에 저장합니다.
            console.error('인증 확인 중 오류 발생:', error);
            dispatch(loginFailure('인증 확인 중 오류 발생'));
        }
    };

    // 컴포넌트가 마운트 될 때 인증 상태를 확인하는 함수를 실행합니다.
    useEffect(() => {
        checkAuth();
    }, [dispatch]); // dispatch가 변경될 때마다 함수를 다시 실행합니다.

    return null; // 이 훅은 UI를 반환하지 않습니다.
};

export default useCheckAuth;
