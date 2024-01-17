import { useState } from 'react';
import {
    requestPasswordResetEmail,
    resetPassword,
} from '../../services/authService';
import {
    PasswordResetRequestResponse,
    PasswordResetVerificationResponse,
} from '../../type/authtypes';

export const useResetPassword = () => {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [resetRequestStatus, setResetRequestStatus] =
        useState<PasswordResetRequestResponse | null>(null);
    const [resetStatus, setResetStatus] =
        useState<PasswordResetVerificationResponse | null>(null);

    const handlePasswordResetRequest = async (email: string) => {
        setEmail(email);

        try {
            const response = await requestPasswordResetEmail(email);
            setResetRequestStatus(response);
        } catch (error) {
            console.error('비밀번호 재설정 요청 중 오류 발생:', error);
            throw new Error('비밀번호 재설정 요청 중 오류 발생');
        }
    };

    const handlePasswordReset = async (
        email: string,
        code: string,
        newPassword: string
    ) => {
        try {
            const response = await resetPassword(email, code, newPassword);
            setResetStatus(response);
        } catch (error) {
            console.error('비밀번호 재설정 중 오류 발생:', error);
            throw new Error('비밀번호 재설정 중 오류 발생');
        }
    };

    return {
        email,
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
