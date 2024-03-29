import {
    LoginFormData,
    LoginFormErrors,
    RegistrationFormData,
    RegistrationFormErrors,
} from '../type/authtypes';

// 회원가입 유효성 검사
export const validateRegistrationForm = (
    formData: RegistrationFormData
): RegistrationFormErrors => {
    const errors: RegistrationFormErrors = {};

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
    if (
        formData.password &&
        (formData.password.length < 8 ||
            !/[A-Z]/.test(formData.password) ||
            !/\d/.test(formData.password))
    ) {
        errors.password =
            '비밀번호는 최소 8자 이상이며, 하나 이상의 숫자와 대문자를 포함해야 합니다.';
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

// 이메일 유효성 검사
export const isEmailValid = (email: string): boolean => {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
};
