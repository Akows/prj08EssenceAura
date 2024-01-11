import { useState } from 'react';
import { FormData, FormErrors } from '../../type/types';
import { validateSignupForm } from '../../utils/auth';

const useSignup = () => {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        building_name: '',
        phone_number: '',
    });
    const [validation, setValidation] = useState<FormErrors>({});
    const [isAgreed, setIsAgreed] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsAgreed(e.target.checked);
    };

    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isAgreed) {
            alert('이용 약관에 동의해야 회원가입이 가능합니다.');
            return;
        }

        const errors = validateSignupForm(formData);
        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch(
                    'http://localhost:3001/api/signup',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    }
                );

                if (response.ok) {
                    const result = await response.json();
                    console.log(result);
                    alert('회원가입이 완료되었습니다.');
                } else {
                    const errorResult = await response.json();
                    alert(errorResult.message);
                }
            } catch (error) {
                console.error('회원가입 요청 중 오류 발생:', error);
                alert('회원가입 중 오류가 발생했습니다.');
            }
        } else {
            setValidation(errors);
        }
    };

    return {
        formData,
        validation,
        isAgreed,
        handleChange,
        handleAgreementChange,
        handleSignup,
    };
};

export default useSignup;
