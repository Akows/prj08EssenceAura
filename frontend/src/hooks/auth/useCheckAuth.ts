import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginFailure, loginSuccess } from '../../redux/slices/authSlice';

const useCheckAuth = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(
                    'http://localhost:3001/auth/check-auth',
                    {
                        method: 'GET',
                        credentials: 'include', // 쿠키를 포함시키기 위한 설정
                    }
                );
                const data = await response.json();
                if (response.ok) {
                    dispatch(loginSuccess(data.userInfo));
                } else {
                    dispatch(loginFailure(data.message)); // 실패 응답에 포함된 메시지를 사용
                }
            } catch (error) {
                console.error('인증 확인 중 오류 발생:', error);

                // 타입 가드를 사용하여 error가 Error 인스턴스인지 확인
                if (error instanceof Error) {
                    dispatch(loginFailure(error.message));
                } else {
                    dispatch(loginFailure('알 수 없는 오류가 발생했습니다.'));
                }
            }
        };

        checkAuth();
    }, [dispatch]);
};

export default useCheckAuth;
