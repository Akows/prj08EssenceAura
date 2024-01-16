import { EmailVerificationResponse } from '../type/authtypes';

const API_BASE_URL = 'http://localhost:3001/api';

// 이메일 인증 코드 요청 함수
export const sendVerificationRequest = async (
    email: string
): Promise<EmailVerificationResponse> => {
    const response = await fetch(`${API_BASE_URL}/request-verification`, {
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
        const errorData = await response.json();
        throw new Error(errorData.message || '인증 코드 검증에 실패했습니다.');
    }

    return response.json();
};
