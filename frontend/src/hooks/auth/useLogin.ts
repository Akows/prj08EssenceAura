import { useState } from 'react';
import { LoginFormData, LoginFormErrors } from '../../type/authtypes';
import { validateLoginForm } from '../../utils/auth';

const useLogin = () => {
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
                        body: JSON.stringify({
                            email: formData.email,
                            password: formData.password,
                        }),
                    }
                );

                const data = await response.json();
                if (response.ok) {
                    console.log(data);
                    // 로그인 성공 후 로직 구현 해야함, JWT 저장 등
                    alert('로그인에 성공했습니다.');
                } else {
                    // 에러 발생시 동작할 로직 구현 해야함.
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

    return {
        formData,
        validation,
        handleChange,
        handleLogin,
        isSubmitting,
    };
};

export default useLogin;
