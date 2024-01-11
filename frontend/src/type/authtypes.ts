// 회원가입 데이터
export interface SignUpFormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
    building_name: string;
    phone_number: string;
}

// 회원가입 유효성 검사
export interface SignUpFormErrors {
    email?: string;
    password?: string;
    username?: string;
    confirmPassword?: string;
    address?: string;
    building_name?: string;
    phone_number?: string;
}

// 회원가입 커스텀 훅의 타입
export interface UseSignUpReturn {
    signUpformData: SignUpFormData;
    signUpvalidation: SignUpFormErrors;
    signUpIsAgree: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAgreementChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSignup: (e: React.FormEvent<HTMLFormElement>) => void;
}

// 로그인 데이터
export interface LoginFormData {
    email: string;
    password: string;
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
    handleLogout: () => void;
    isSubmitting: boolean;
}
