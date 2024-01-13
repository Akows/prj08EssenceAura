import React from 'react';
import styled from 'styled-components';
import { useModal } from '../../hooks/auth/useModal';
import { useResetPassword } from '../../hooks/auth/useResetPassword';
import EmailVerificationModal from './EmailVerificationModal';

const Form = styled.form`
    width: 100%; // 부모 요소의 너비를 차지하도록 설정
    box-sizing: border-box; // padding과 border를 너비 계산에 포함
    margin-top: 20px;
`;

const Label = styled.label`
    display: block;
    margin-top: 15px;
`;

const Input = styled.input`
    width: 100%; // padding과 border를 포함한 전체 너비
    padding: 8px;
    box-sizing: border-box; // padding과 border를 너비 계산에 포함
    margin-top: 5px;
`;

const Button = styled.button`
    padding: 10px 15px;
    margin-top: 20px;
    width: 100%;
    background-color: #e44d26;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #f55f3b;
    }
`;

const ResetPasswordForm: React.FC = () => {
    const { email, setEmail, handleSubmit } = useResetPassword();
    const { isVisible, openModal, closeModal } = useModal();

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h2>비밀번호 초기화</h2>
                <p>
                    가입하신 이메일 주소를 입력하시면, 이메일로 임시 비밀번호를
                    보내드립니다.
                </p>
                <Label>E-MAIL</Label>
                <Input
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                    }
                    placeholder="이메일"
                />
                <Button type="button" onClick={openModal}>
                    인증 메일 보내기
                </Button>
            </Form>
            {isVisible && <EmailVerificationModal closeModal={closeModal} />}
        </>
    );
};

export default ResetPasswordForm;
