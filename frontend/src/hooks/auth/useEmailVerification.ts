import { useState } from 'react';
import {
    sendVerificationRequest,
    verifyEmailCode,
} from '../../services/authService';
import {
    EmailVerificationErrors,
    EmailVerificationResponse,
    UseEmailVerificationReturn,
} from '../../type/authtypes';

const useEmailVerification = (): UseEmailVerificationReturn => {
    const [isVerificationSent, setVerificationSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [verificationError, setVerificationError] =
        useState<EmailVerificationErrors>({ message: '' });

    // 이메일 인증 코드 요청 함수
    const requestVerificationCode = async (email: string): Promise<void> => {
        try {
            // API 요청을 통해 인증 코드 검증
            const response: EmailVerificationResponse =
                await sendVerificationRequest(email);
            setVerificationSent(response.success);
        } catch (error) {
            setVerificationError({ message: (error as Error).message });
        }
    };

    // 인증 코드 검증 함수
    const verifyCode = async (email: string, code: string): Promise<void> => {
        try {
            // API 요청을 통해 인증 코드 검증
            const response: EmailVerificationResponse = await verifyEmailCode(
                email,
                code
            );
            setIsVerified(response.success);
        } catch (error) {
            setVerificationError({ message: (error as Error).message });
        }
    };

    return {
        isVerificationSent,
        isVerified,
        verificationError,
        requestVerificationCode,
        verifyCode,
    };
};

export default useEmailVerification;
