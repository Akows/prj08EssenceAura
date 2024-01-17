import { useState } from 'react';
import {
    requestPasswordResetEmail,
    resetPassword,
} from '../../services/authService';
import {
    PasswordResetRequestResponse,
    PasswordResetVerificationResponse,
    UseResetPasswordReturn,
} from '../../type/authtypes';

export const useResetPassword = (): UseResetPasswordReturn => {
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [resetRequestStatus, setResetRequestStatus] =
        useState<PasswordResetRequestResponse | null>(null);
    const [resetStatus, setResetStatus] =
        useState<PasswordResetVerificationResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handlePasswordResetRequest = async (email: string) => {
        setIsLoading(true);
        try {
            const response = await requestPasswordResetEmail(email);
            setResetRequestStatus(response);
        } catch (error) {
            console.error('비밀번호 재설정 요청 중 오류 발생:', error);
            throw new Error(`${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordReset = async (
        email: string,
        code: string,
        newPassword: string
    ) => {
        setIsLoading(true);
        try {
            const response = await resetPassword(email, code, newPassword);
            setResetStatus(response);
        } catch (error) {
            console.error('비밀번호 재설정 중 오류 발생:', error);
            throw new Error('비밀번호 재설정 중 오류 발생');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        verificationCode,
        setVerificationCode,
        newPassword,
        setNewPassword,
        handlePasswordResetRequest,
        handlePasswordReset,
        resetRequestStatus,
        resetStatus,
    };
};
