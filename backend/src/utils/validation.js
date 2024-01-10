exports.validateSignupData = (formData) => {
    const errors = {};

    // 유효성 검사 로직
    // ...

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};
