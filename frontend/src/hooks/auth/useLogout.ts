import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';
import { fetchLogout } from '../../services/authService';

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLoading, setIsloading] = useState(false);

    const handleLogout = async () => {
        setIsloading(true);
        try {
            // 서버로 로그아웃 요청 보냄
            const response = await fetchLogout();

            if (response.ok) {
                // Redux 스토어의 로그아웃 상태 업데이트
                dispatch(logout());

                setIsloading(false);

                // 로그아웃 성공 후 '/shop' 페이지로 리디렉션
                navigate('/shop');
                alert('로그아웃 되었습니다.');
            }
        } catch (error) {
            setIsloading(false);
            console.error('로그아웃 중 오류 발생:', error);
            location.reload(); // 현재 페이지 새로고침
            alert('로그아웃 중 오류가 발생했습니다.');
        }
    };

    return { isLoading, handleLogout };
};

export default useLogout;
