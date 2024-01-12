import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from '../../redux/slices/authSlice';
import {
    LoginFormData,
    LoginFormErrors,
    UseLoginReturn,
} from '../../type/authtypes';
import { validateLoginForm } from '../../utils/auth';

const useLogin = (): UseLoginReturn => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: '',
    });
    const [validation, setValidation] = useState<LoginFormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);

        const errors = validateLoginForm(formData);
        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch(
                    'http://localhost:3001/api/login',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include', // 쿠키를 포함시키기 위한 설정
                        body: JSON.stringify({
                            email: formData.email,
                            password: formData.password,
                        }),
                    }
                );

                const data = await response.json();
                if (response.ok) {
                    console.log(data);

                    // Redux 스토어에 로그인 성공 상태 업데이트
                    dispatch(loginSuccess(data.userInfo));

                    // 로그인 성공 후 로직 구현 해야함..
                    alert('로그인에 성공했습니다.');
                } else {
                    // 에러 발생시 동작할 로직 구현 해야함..
                    alert(data.message);
                }
            } catch (error) {
                console.error('로그인 요청 중 오류 발생:', error);
                alert('로그인 중 오류가 발생했습니다.');
            }
        } else {
            setValidation(errors);
        }

        setIsSubmitting(false);
    };

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
                alert('로그아웃 되었습니다.');
            }
        } catch (error) {
            console.error('로그아웃 중 오류 발생:', error);
        }
    };

    return {
        formData,
        validation,
        handleChange,
        handleLogin,
        handleLogout,
        isSubmitting,
    };
};

export default useLogin;
