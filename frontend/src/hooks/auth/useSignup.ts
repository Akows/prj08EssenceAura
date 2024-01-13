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

    const [emailChecked, setEmailChecked] = useState(false); // 이메일 중복 검사 완료 상태
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

    const handleCheckEmail = async () => {
        if (!signUpformData.email) {
            alert('이메일을 입력해주세요.');
            return;
        }

        try {
            const response = await fetch(
                'http://localhost:3001/api/check-email',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: signUpformData.email }),
                }
            );
            const data = await response.json();

            if (response.ok && data.isAvailable) {
                setEmailChecked(true); // 이메일 중복 검사 완료
                alert(
                    '사용 가능한 이메일입니다. 계속해서 회원가입을 진행해주세요.'
                );
            } else {
                setEmailChecked(false); // 중복된 이메일이 있으므로 중복 검사 완료 상태를 false로 설정
                alert(
                    '이미 사용 중인 이메일입니다. 다른 이메일을 사용해주세요.'
                );
            }
        } catch (error) {
            console.error('이메일 중복 검사 중 오류 발생:', error);
            alert(
                '이메일 중복 검사 중 오류가 발생했습니다. 다시 시도해주세요.'
            );
        }
    };

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!signUpIsAgree) {
            alert('이용 약관에 동의해야 회원가입이 가능합니다.');
            return;
        }

        const errors = validateSignupForm(signUpformData);
        if (Object.keys(errors).length === 0) {
            // 중복 검사를 완료하지 않았으면 회원가입 진행을 중단
            if (!emailChecked) {
                alert('이메일 중복 검사를 완료해주세요.');
                return;
            }
            setsignUpIsSubmitting(true);

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
                alert('회원가입 중 오류가 발생했습니다.');
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
        handleCheckEmail,
        handleSignup,
        signUpIsSubmitting,
    };
};

export default useSignup;
