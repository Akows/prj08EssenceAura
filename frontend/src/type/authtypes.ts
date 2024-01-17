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
    emailChecked: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCheckEmail: () => void;
    handleRegistration: (e: React.FormEvent<HTMLFormElement>) => void;
    signUpIsSubmitting: boolean;
    termsAgreed: boolean; // 추가됨
    privacyAgreed: boolean; // 추가됨
    isVerified: boolean; // 추가됨
    setIsVerified: (isVerified: boolean) => void; // 추가됨
    handleAgreementChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // 추가됨
    handleSendVerificationCode: () => void; // 추가됨
    handleVerifyEmailCode: (code: string) => Promise<void>; // 추가됨
    handleCancelSignUp: () => void; // 추가됨
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

// 모달 컴포넌트의 타입
export interface EmailVerificationModalProps {
    closeModal: () => void;
    handleVerifyEmailCode: (code: string) => Promise<void>;
    setIsVerified: (isVerified: boolean) => void; // 상태 업데이트 함수
    handleCancelSignUp: () => void; // 추가됨
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

// 이메일 취소 기능의 데이터 반환타입
export interface VerificationCancelResponse {
    message: string;
}

// 비밀번호 재설정 커스텀 훅의 타입
export interface UseResetPasswordReturn {
    isLoading: boolean;
    verificationCode: string;
    setVerificationCode: (value: string) => void;
    newPassword: string;
    setNewPassword: (value: string) => void;
    resetRequestStatus: PasswordResetRequestResponse | null;
    resetStatus: PasswordResetVerificationResponse | null;
    handlePasswordResetRequest: (email: string) => Promise<void>;
    handlePasswordReset: (
        email: string,
        code: string,
        newPassword: string
    ) => Promise<void>;
}

// 비밀번호 재설정 이메일 요청의 데이터 반환타입
export interface PasswordResetRequestResponse {
    success: boolean;
    message: string;
}
// 비밀번호 재설정 인증 코드 검증 및 변경의 데이터 반환타입
export interface PasswordResetVerificationResponse {
    success: boolean;
    message: string;
}
