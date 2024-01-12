import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    SignUpFormData,
    SignUpFormErrors,
    UseSignUpReturn,
} from '../../type/authtypes';
import { validateSignupForm } from '../../utils/auth';

const useSignup = (): UseSignUpReturn => {
    const navigate = useNavigate();

    const [signUpformData, setSignUpformData] = useState<SignUpFormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        building_name: '',
        phone_number: '',
    });
    const [signUpvalidation, setSignUpvalidation] = useState<SignUpFormErrors>(
        {}
    );
    const [signUpIsAgree, setSignUpIsAgree] = useState(false);
    const [signUpIsSubmitting, setsignUpIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpformData({
            ...signUpformData,
            [e.target.id]: e.target.value,
        });
    };

    const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpIsAgree(e.target.checked);
    };

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setsignUpIsSubmitting(true);

        if (!signUpIsAgree) {
            alert('이용 약관에 동의해야 회원가입이 가능합니다.');
            return;
        }

        const errors = validateSignupForm(signUpformData);
        if (Object.keys(errors).length === 0) {
            try {
                const response = await fetch(
                    'http://localhost:3001/api/signup',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(signUpformData),
                    }
                );

                if (response.ok) {
                    const result = await response.json();
                    console.log(result);

                    navigate('/shop');
                    alert('회원가입이 완료되었습니다.');
                } else {
                    const errorResult = await response.json();
                    alert(errorResult.message);
                }
            } catch (error) {
                console.error('회원가입 요청 중 오류 발생:', error);
                alert('회원가입 중 오류가 발생했습니다.', error);
            }
        } else {
            setSignUpvalidation(errors);
        }

        setsignUpIsSubmitting(false);
    };

    return {
        signUpformData,
        signUpvalidation,
        signUpIsAgree,
        handleChange,
        handleAgreementChange,
        handleSignup,
        signUpIsSubmitting,
    };
};

export default useSignup;
