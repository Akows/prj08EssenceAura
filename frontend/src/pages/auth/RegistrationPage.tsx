import React from 'react';
import styled from 'styled-components';
import RegistrationForm from '../../components/auth/RegistrationForm';

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

const RegistrationPage: React.FC = () => {
    const handleSignup = (formData) => {
        // 회원가입 처리 로직
    };

    return (
        <RegistrationContainer>
            <Title>회원가입</Title>

            {/* 이용 약관 및 개인정보 처리 동의 */}
            <CheckboxLabel>
                <Checkbox type="checkbox" />
                <div>이용약관에 동의합니다. (전문보기)</div>
            </CheckboxLabel>
            <CheckboxLabel>
                <Checkbox type="checkbox" />
                <div>개인정보 수집 및 이용에 동의합니다.</div>
            </CheckboxLabel>

            {/* 회원정보 입력 폼 */}
            <RegistrationForm onSignup={handleSignup} />
        </RegistrationContainer>
    );
};

export default RegistrationPage;
