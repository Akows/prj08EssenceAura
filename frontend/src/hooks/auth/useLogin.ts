import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../redux/slices/authSlice';
import { fetchLogin } from '../../services/authService';
import {
    LoginFormData,
    LoginFormErrors,
    UseLoginReturn,
} from '../../type/authtypes';
import { validateLoginForm } from '../../utils/auth';

const useLogin = (): UseLoginReturn => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
        isAdmin: false,
    });
    const [validation, setValidation] = useState<LoginFormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            setFormData({
                ...formData,
                [name]: checked, // 체크박스의 경우 checked 값을 사용
            });
        } else {
            setFormData({
                ...formData,
                [name]: value, // 기타 입력 필드의 경우 value 값을 사용
            });
        }
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        const errors = validateLoginForm(formData);
        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetchLogin(formData);

                // 로그인이 성공하게 되면 리프래시 토큰은 브라우저 쿠키에 저장됨.
                const data = await response.json();
                if (response.ok) {
                    // Redux 스토어에 로그인 성공 상태 업데이트
                    dispatch(
                        loginSuccess({ ...data, accessToken: data.accessToken })
                    ); // 로그인 정보와, 액세스 토큰 저장

                    // 로그인 성공 후 '/shop' 페이지로 리디렉션
                    navigate('/shop');
                    alert('로그인에 성공했습니다.');
                } else {
                    // 에러 발생시 동작할 로직 구현 해야함..
                    alert(data.message);
                }
            } catch (error) {
                console.error('로그인 요청 중 오류 발생:', error);
                location.reload(); // 현재 페이지 새로고침
                alert('로그인 중 오류가 발생했습니다.');
            }
        } else {
            setValidation(errors);
        }

        setIsSubmitting(false);
    };

    return {
        formData,
        validation,
        handleChange,
        handleLogin,
        isSubmitting,
    };
};

export default useLogin;
