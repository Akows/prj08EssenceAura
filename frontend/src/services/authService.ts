import {
    EmailVerificationResponse,
    PasswordResetCancelResponse,
    PasswordResetRequestResponse,
    PasswordResetVerificationResponse,
    VerificationCancelResponse,
} from '../type/authtypes';

const API_BASE_URL = 'http://localhost:3001/auth';

// 이메일 인증 코드 요청 함수
export const sendVerificationRequest = async (
    email: string
): Promise<EmailVerificationResponse> => {
    const response = await fetch(`${API_BASE_URL}/verify-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '인증 코드 요청에 실패했습니다.');
    }

    return response.json();
};

// 이메일 인증 코드 검증 함수
export const verifyEmailCode = async (
    email: string,
    code: string
): Promise<EmailVerificationResponse> => {
    const response = await fetch(`${API_BASE_URL}/verify-code`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
    });

    if (!response.ok) {
        if (response.status === 400) {
            throw new Error('잘못된 인증 코드 입니다.');
        }
        throw new Error('인증 코드 검증에 실패했습니다.');
    }

    return response.json();
};

// 회원가입 취소 함수
export const cancelSignUp = async (
    email: string
): Promise<VerificationCancelResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/cancel-signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('회원가입 취소 요청 중 오류 발생:', error);
        throw error;
    }
};

// 비밀번호 재설정 이메일 요청 함수
export const requestPasswordResetEmail = async (
    email: string
): Promise<PasswordResetRequestResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/password-reset/request`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            if (response.status === 429) {
                throw new Error('이메일 재인증은 5분 뒤에 가능합니다.');
            }
            if (response.status === 404) {
                throw new Error('존재하지 않는 사용자입니다.');
            }
            throw new Error('비밀번호 재설정 이메일 요청 실패');
        }

        return await response.json();
    } catch (error) {
        console.error('비밀번호 재설정 이메일 요청 중 오류 발생:', error);
        throw error;
    }
};

// 비밀번호 재설정 - 인증 코드 검증 및 변경 함수
export const resetPassword = async (
    email: string,
    code: string,
    newPassword: string
): Promise<PasswordResetVerificationResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/password-reset/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, code, newPassword }),
        });

        if (!response.ok) {
            throw new Error('비밀번호 재설정 실패');
        }

        return await response.json();
    } catch (error) {
        console.error('비밀번호 재설정 중 오류 발생:', error);
        throw error;
    }
};

// 비밀번호 취소 함수
export const cancelPasswordReset = async (
    email: string
): Promise<PasswordResetCancelResponse> => {
    try {
        const response = await fetch(`${API_BASE_URL}/cancel-passwordreset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('비밀번호 재설정 취소 중 오류 발생:', error);
        throw error;
    }
};
