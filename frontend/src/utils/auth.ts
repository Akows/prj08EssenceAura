import {
    LoginFormData,
    LoginFormErrors,
    SignUpFormData,
    SignUpFormErrors,
} from '../type/authtypes';

// 회원가입 유효성 검사
export const validateSignupForm = (
    formData: SignUpFormData
): SignUpFormErrors => {
    const errors: SignUpFormErrors = {};

    // 빈 값 체크
    if (!formData.username) {
        errors.username = '사용자 이름을 입력하세요.';
    }
    if (!formData.email) {
        errors.email = '이메일을 입력하세요.';
    }
    if (!formData.password) {
        errors.password = '비밀번호를 입력하세요.';
    }
    if (!formData.confirmPassword) {
        errors.confirmPassword = '비밀번호 확인을 입력하세요.';
    }
    if (!formData.address) {
        errors.address = '주소를 입력하세요.';
    }
    if (!formData.building_name) {
        errors.building_name = '상세주소를 입력하세요.';
    }
    if (!formData.phone_number) {
        errors.phone_number = '전화번호를 입력하세요.';
    }

    // 이메일 유효성 검사
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = '유효한 이메일 주소를 입력하세요.';
    }

    // 비밀번호 복잡성 검사
    if (formData.password && formData.password.length < 6) {
        errors.password = '비밀번호는 6자 이상이어야 합니다.';
    }

    // 비밀번호 일치 검사
    if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
    }

    return errors;
};

// 로그인 유효성 검사
export const validateLoginForm = (formData: LoginFormData): LoginFormErrors => {
    const errors: LoginFormErrors = {};

    // 빈 값 체크
    if (!formData.email) {
        errors.email = '이메일을 입력하세요.';
    }
    if (!formData.password) {
        errors.password = '비밀번호를 입력하세요.';
    }

    // 이메일 유효성 검사
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = '유효한 이메일 주소를 입력하세요.';
    }

    return errors;
};
