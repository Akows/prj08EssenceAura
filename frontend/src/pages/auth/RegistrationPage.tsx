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

    const handleSignup = async (formData: FormData) => {
        if (!isAgreed) {
            alert('이용 약관에 동의해야 회원가입이 가능합니다.');
            return;
        }

        // 백엔드 서버의 주소와 포트 번호를 포함한 URL
        const backendUrl = 'http://localhost:3001/api/signup';

        try {
            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                // 회원가입 성공 후 처리
                console.log(result);
                alert('회원가입이 완료되었습니다.');
            } else {
                // 서버 에러 응답 처리
                const errorResult = await response.json();
                alert(errorResult.message);
            }
        } catch (error) {
            // 네트워크 에러 또는 요청 취소 등의 에러 처리
            console.error('회원가입 요청 중 오류 발생:', error);
            alert('회원가입 중 오류가 발생했습니다.');
        }
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
