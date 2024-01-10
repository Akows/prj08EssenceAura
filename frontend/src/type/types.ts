// 회원가입 데이터
export interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
    building_name: string;
    phone_number: string;
}

// 회원가입 함수
export interface RegistrationFormProps {
    onSignup: (formData: FormData) => void;
}

// 회원가입 유효성 검사
export interface FormErrors {
    email?: string;
    password?: string;
    username?: string;
    confirmPassword?: string;
    address?: string;
    building_name?: string;
    phone_number?: string;
}
