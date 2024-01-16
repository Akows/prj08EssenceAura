import React from 'react';
import styled from 'styled-components';
import RegistrationForm from '../../components/auth/RegistrationForm';
import useRegistration from '../../hooks/auth/useRegistration';

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
    const {
        signUpformData,
        signUpvalidation,
        handleChange,
        handleCheckEmail,
        termsAgreed,
        privacyAgreed,
        handleAgreementChange,
        handleSendVerificationCode,
        handleRegistration,
        signUpIsSubmitting,
    } = useRegistration();

    return (
        <RegistrationContainer>
            <Title>회원가입</Title>

            {/* 이용 약관 및 개인정보 처리 동의 */}
            <CheckboxLabel>
                <Checkbox
                    id="termsAgreement"
                    type="checkbox"
                    onChange={handleAgreementChange}
                    checked={termsAgreed}
                />
                <div>
                    이용약관에 동의합니다. <a href="/terms">전문보기</a>
                </div>
            </CheckboxLabel>
            <CheckboxLabel>
                <Checkbox
                    id="privacyAgreement"
                    type="checkbox"
                    onChange={handleAgreementChange}
                    checked={privacyAgreed}
                />
                <div>개인정보 수집 및 이용에 동의합니다.</div>
            </CheckboxLabel>

            {/* 회원정보 입력 폼 */}
            <RegistrationForm
                signUpformData={signUpformData}
                signUpvalidation={signUpvalidation}
                handleChange={handleChange}
                handleCheckEmail={handleCheckEmail}
                handleSendVerificationCode={handleSendVerificationCode}
                handleRegistration={handleRegistration}
                signUpIsSubmitting={signUpIsSubmitting}
            />
        </RegistrationContainer>
    );
};

export default RegistrationPage;
