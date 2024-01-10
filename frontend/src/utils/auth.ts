import { FormData } from '../type/types';

interface FormErrors {
    email?: string;
    password?: string;
}

// 토큰 유효성 검증, 제거 등의 함수 구현
// export const saveToken = (token) => {
//     localStorage.setItem('authToken', token);
// };

// export const getToken = () => {
//     return localStorage.getItem('authToken');
// };

// 회원가입 유효성 검사
export const validateSignupForm = (formData: FormData): FormErrors => {
    const errors: FormErrors = {};

    if (!formData.email.includes('@')) {
        errors.email = '유효한 이메일 주소를 입력하세요.';
    }
    if (formData.password.length < 6) {
        errors.password = '비밀번호는 6자 이상이어야 합니다.';
    }
    // 기타 유효성 검사...

    return errors;
};
