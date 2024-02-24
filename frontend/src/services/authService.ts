import {
    EmailCheckResponse,
    EmailVerificationResponse,
    LoginFormData,
    PasswordResetCancelResponse,
    PasswordResetRequestResponse,
    PasswordResetVerificationResponse,
    RegistrationFormData,
    VerificationCancelResponse,
} from '../type/authtypes';

// 회원가입 함수
export const checkEmailRequest = async (
    email: string
): Promise<EmailCheckResponse> => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/check-email`, // 환경 변수를 사용하여 API URL 설정
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        }
    );

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '이메일 확인에 실패했습니다.');
    }

    return response.json();
};

// 이메일 인증 코드 요청 함수
export const sendVerificationRequest = async (
    email: string
): Promise<EmailVerificationResponse> => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verify-email`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        }
    );

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
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/verify-code`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, code }),
        }
    );

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
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/auth/cancel-signup`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            }
        );
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
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/auth/password-reset/request`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            }
        );

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
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/auth/password-reset/verify`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, code, newPassword }),
            }
        );

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
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/auth/cancel-passwordreset`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            }
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('비밀번호 재설정 취소 중 오류 발생:', error);
        throw error;
    }
};

// 새로운 액세스 토큰을 재발급 받는 함수
export const fetchNewAccessToken = async (refreshToken: string | null) => {
    // 서버에 리프래시 토큰을 사용해 새로운 액세스 토큰을 요청
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // 쿠키에 저장된 리프래시 토큰을 포함
            body: JSON.stringify({ refreshToken }),
        }
    );
    const data = await response.json();

    // 서버로부터 새로운 액세스 토큰을 정상적으로 받았다면 반환
    if (response.ok) {
        return data.accessToken;
    } else {
        // 새로운 액세스 토큰을 받지 못했다면, 오류를 발생
        throw new Error(data.message || '액세스 토큰 재발급 실패');
    }
};

// 사용자 인증 상태 검증 함수
export const fetchCheckAuth = async (
    accessToken: string | null,
    refreshToken: string | null
) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/check-auth`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`, // 헤더에 액세스 토큰 포함
            },
            credentials: 'include', // 쿠키 포함 설정
            body: JSON.stringify({ refreshToken }),
        }
    );

    return response;
};

// 이메일 찾기 함수
export const fetchFindEmail = async (name: string, phone: string) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/find-email`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, phone }),
        }
    );

    return response;
};

// 회원가입 함수
export const fetchRegistration = async (
    signUpformData: RegistrationFormData
) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signUpformData),
        }
    );

    return response;
};

// 로그인 함수
export const fetchLogin = async (formData: LoginFormData) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // 쿠키를 포함시키기 위한 설정
        body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            isAdmin: formData.isAdmin,
        }),
    });

    return response;
};

// 로그아웃 함수
export const fetchLogout = async (refreshToken: string | null) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/logout`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // 쿠키를 포함시키기 위한 설정
            body: JSON.stringify({ refreshToken }),
        }
    );

    return response;
};

// 아래는 실패한 리팩토링 작업의 결과물들.
// 리팩토링을 중단하긴 했으나, 참고용으로 사용하기 위해 코드들을 삭제하지는 않고 주석처리.

// // API를 요청하는 공통 함수
// const fetchWithSettings = async (url: string, settings: RequestInit) => {
//     const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
//         headers: { 'Content-Type': 'application/json' },
//         ...settings,
//     });

//     return response;
// };

// // 이메일 인증 코드 요청 함수
// export const sendVerificationRequest = async (
//     email: string
// ): Promise<EmailVerificationResponse> => {
//     const response = await fetchWithSettings('/verify-email', {
//         method: 'POST',
//         body: JSON.stringify({ email }),
//     });
//     return response.json();
// };

// // 이메일 인증 코드 검증 함수
// export const verifyEmailCode = async (
//     email: string,
//     code: string
// ): Promise<EmailVerificationResponse> => {
//     const response = await fetchWithSettings('/verify-code', {
//         method: 'POST',
//         body: JSON.stringify({ email, code }),
//     });
//     return response.json();
// };

// // 회원가입 취소 함수
// export const cancelSignUp = async (
//     email: string
// ): Promise<VerificationCancelResponse> => {
//     const response = await fetchWithSettings('/cancel-signup', {
//         method: 'POST',
//         body: JSON.stringify({ email }),
//     });
//     return response.json();
// };

// // 비밀번호 재설정 이메일 요청 함수
// export const requestPasswordResetEmail = async (
//     email: string
// ): Promise<PasswordResetRequestResponse> => {
//     const response = await fetchWithSettings('/password-reset/request', {
//         method: 'POST',
//         body: JSON.stringify({ email }),
//     });
//     return response.json();
// };

// // 비밀번호 재설정 - 인증 코드 검증 및 변경 함수
// export const resetPassword = async (
//     email: string,
//     code: string,
//     newPassword: string
// ): Promise<PasswordResetVerificationResponse> => {
//     const response = await fetchWithSettings('/password-reset/verify', {
//         method: 'POST',
//         body: JSON.stringify({ email, code, newPassword }),
//     });
//     return response.json();
// };

// // 비밀번호 취소 함수
// export const cancelPasswordReset = async (
//     email: string
// ): Promise<PasswordResetCancelResponse> => {
//     const response = await fetchWithSettings('/cancel-passwordreset', {
//         method: 'POST',
//         body: JSON.stringify({ email }),
//     });
//     return response.json();
// };

// // 새로운 액세스 토큰을 재발급 받는 함수
// export const fetchNewAccessToken = async (): Promise<string> => {
//     const response = await fetchWithSettings('/refresh-token', {
//         method: 'GET',
//         credentials: 'include',
//     });
//     const data = await response.json();
//     return data.accessToken;
// };

// // 사용자 인증 상태 확인 함수
// export const checkAuthStatus = async (
//     accessToken: string | null
// ): Promise<Response> => {
//     const response = await fetchWithSettings('/check-auth', {
//         method: 'GET',
//         headers: {
//             Authorization: `Bearer ${accessToken}`,
//         },
//         credentials: 'include',
//     });

//     return response;
// };
