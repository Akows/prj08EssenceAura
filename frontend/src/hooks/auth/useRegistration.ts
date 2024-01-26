import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    cancelSignUp,
    sendVerificationRequest,
    verifyEmailCode,
} from '../../services/authService';
import {
    RegistrationFormData,
    RegistrationFormErrors,
    UseRegistrationReturn,
} from '../../type/authtypes';
import { validateRegistrationForm } from '../../utils/auth';

const useRegistration = (): UseRegistrationReturn => {
    const navigate = useNavigate();

    const [signUpformData, setSignUpformData] = useState<RegistrationFormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        building_name: '',
        phone_number: '',
    });
    const [signUpvalidation, setSignUpvalidation] =
        useState<RegistrationFormErrors>({});

    // 이메일 중복 검사 완료 상태
    const [emailChecked, setEmailChecked] = useState(false);
    // 이메일 인증 상태
    const [isVerified, setIsVerified] = useState(false);
    // 약관 동의 여부
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [privacyAgreed, setPrivacyAgreed] = useState(false);
    // loading 여부
    const [signUpIsSubmitting, setsignUpIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpformData({
            ...signUpformData,
            [e.target.id]: e.target.value,
        });
    };

    // 약관 동의 핸들링을 위한 함수
    const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.id) {
            case 'termsAgreement':
                setTermsAgreed(e.target.checked);
                break;
            case 'privacyAgreement':
                setPrivacyAgreed(e.target.checked);
                break;
            default:
                // 다른 경우에 대한 처리
                break;
        }
    };

    const handleCheckEmail = async () => {
        if (!signUpformData.email) {
            alert('이메일을 입력해주세요.');
            return;
        }

        try {
            const response = await fetch(
                'http://localhost:3001/auth/check-email',
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

    // 이메일 인증 코드 전송 핸들러
    const handleSendVerificationCode = async () => {
        if (!emailChecked) {
            alert('먼저 이메일 중복 검사를 완료해주세요.');
            return;
        }
        try {
            await sendVerificationRequest(signUpformData.email);
            alert(
                '인증 코드가 이메일로 전송되었습니다. 받으신 코드를 입력해주세요.'
            );
        } catch (error) {
            console.error('인증 코드 전송 중 오류 발생:', error);
            alert('인증 코드 전송에 실패했습니다. 다시 시도해주세요.');
        }
    };

    // 이메일 인증 코드 검증 핸들러
    const handleVerifyEmailCode = async (code: string) => {
        try {
            await verifyEmailCode(signUpformData.email, code);
            setIsVerified(true);
            alert('이메일 인증이 완료되었습니다.');
        } catch (error) {
            console.error('이메일 인증 중 오류 발생:', error);
            throw new Error('잘못된 인증 코드 입니다. 다시 확인해주세요.');
        }
    };

    const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 약관 동의 여부 확인
        if (!termsAgreed || !privacyAgreed) {
            alert('모든 약관에 동의해야 회원가입이 가능합니다.');
            return;
        }

        const errors = validateRegistrationForm(signUpformData);
        if (Object.keys(errors).length === 0) {
            // 이메일 중복 검사 및 인증 확인
            if (!emailChecked) {
                alert('이메일 중복 검사를 완료해주세요.');
                return;
            }

            // 이메일 인증 확인
            if (!isVerified) {
                alert('이메일 인증을 완료해주세요.');
                return;
            }

            setsignUpIsSubmitting(true);

            try {
                const response = await fetch(
                    'http://localhost:3001/auth/signup',
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

    // 회원가입 취소 처리 핸들러
    const handleCancelSignUp = async () => {
        if (!signUpformData.email) {
            console.log('이메일 주소가 없어 취소 처리를 진행하지 않습니다.');
            return;
        }

        try {
            const response = await cancelSignUp(signUpformData.email);

            if (!response) {
                throw new Error('회원가입 취소 요청 실패');
            }
            alert('회원가입이 취소되었습니다.');
        } catch (error) {
            console.error('회원가입 취소 처리 중 에러:', error);
        }
    };

    return {
        signUpformData,
        signUpvalidation,
        emailChecked,
        handleChange,
        handleCheckEmail,
        termsAgreed,
        privacyAgreed,
        isVerified,
        setIsVerified,
        handleAgreementChange,
        handleSendVerificationCode,
        handleVerifyEmailCode,
        handleRegistration,
        handleCancelSignUp,
        signUpIsSubmitting,
    };
};

export default useRegistration;
