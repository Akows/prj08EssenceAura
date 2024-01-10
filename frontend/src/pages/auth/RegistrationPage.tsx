import React, { useState } from 'react';
import styled from 'styled-components';
import RegistrationForm from '../../components/auth/RegistrationForm';
import { FormData, RegistrationFormProps } from '../../type/types';

const RegistrationContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    margin-top: 60px;
`;

const Title = styled.h1`
    text-align: center;
    margin-top: 20px;
`;

const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    margin-top: 15px;
`;

const Checkbox = styled.input`
    margin-right: 10px;
`;

const RegistrationPage: React.FC<RegistrationFormProps> = () => {
    const [isAgreed, setIsAgreed] = useState(false);

    const handleAgreementChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setIsAgreed(event.target.checked);
    };

    const handleSignup = (formData: FormData) => {
        if (!isAgreed) {
            alert('이용 약관에 동의해야 회원가입이 가능합니다.');
            return;
        }

        alert(formData);

        // 회원가입 처리 로직
    };
    return (
        <RegistrationContainer>
            <Title>회원가입</Title>

            {/* 이용 약관 및 개인정보 처리 동의 */}
            <CheckboxLabel>
                <Checkbox type="checkbox" onChange={handleAgreementChange} />
                <div>이용약관에 동의합니다. (전문보기)</div>
            </CheckboxLabel>
            <CheckboxLabel>
                <Checkbox type="checkbox" onChange={handleAgreementChange} />
                <div>개인정보 수집 및 이용에 동의합니다.</div>
            </CheckboxLabel>

            {/* 회원정보 입력 폼 */}
            <RegistrationForm onSignup={handleSignup} />
        </RegistrationContainer>
    );
};

export default RegistrationPage;
