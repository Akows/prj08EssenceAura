// 회원가입 데이터
export interface RegistrationFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
    building_name: string;
    phone_number: string;
}

// 회원가입 유효성 검사
export interface RegistrationFormErrors {
    email?: string;
    password?: string;
    username?: string;
    confirmPassword?: string;
    address?: string;
    building_name?: string;
    phone_number?: string;
}

// 회원가입 커스텀 훅의 타입
export interface UseRegistrationReturn {
    signUpformData: RegistrationFormData;
    signUpvalidation: RegistrationFormErrors;
    signUpIsAgree?: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAgreementChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCheckEmail: () => void;
    handleRegistration: (e: React.FormEvent<HTMLFormElement>) => void;
    signUpIsSubmitting: boolean;
}

// 로그인 데이터
export interface LoginFormData {
    email: string;
    password: string;
    isAdmin: boolean;
}

// 로그인 유효성 검사
export interface LoginFormErrors {
    email?: string;
    password?: string;
}

// 로그인 커스텀 훅의 타입
export interface UseLoginReturn {
    formData: LoginFormData;
    validation: LoginFormErrors;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleLogin: (event: React.FormEvent<HTMLFormElement>) => void;
    isSubmitting: boolean;
}
// 로그아웃 커스텀 훅의 타입
export interface UseLogoutReturn {
    handleLogout: () => void;
}

// 모달 커스텀 훅의 타입
export interface UseModalReturn {
    isVisible: boolean;
    openModal: () => void;
    closeModal: () => void;
}

// 이메일 인증 커스텀 훅의 타입
export interface UseEmailVerificationReturn {
    isVerificationSent: boolean;
    isVerified: boolean;
    verificationError: EmailVerificationErrors;
    requestVerificationCode: (email: string) => Promise<void>;
    verifyCode: (email: string, code: string) => Promise<void>;
}

// 이메일 인증 커스텀 훅의 에러 타입
export interface EmailVerificationErrors {
    message: string;
}

// 이메일 인증 기능의 데이터 반환타입
export interface EmailVerificationResponse {
    success: boolean;
    message: string;
}
