import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/slices/authSlice';

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // 서버로 로그아웃 요청 보냄
            const response = await fetch('http://localhost:3001/api/logout', {
                method: 'POST',
                credentials: 'include', // 쿠키를 포함시키기 위한 설정
            });
            if (response.ok) {
                // Redux 스토어의 로그아웃 상태 업데이트
                dispatch(logout());

                // 로그아웃 성공 후 '/shop' 페이지로 리디렉션
                navigate('/shop');
                alert('로그아웃 되었습니다.');
            }
        } catch (error) {
            console.error('로그아웃 중 오류 발생:', error);
            location.reload(); // 현재 페이지 새로고침
            alert('로그아웃 중 오류가 발생했습니다.');
        }
    };

    return handleLogout;
};

export default useLogout;
