import React from 'react';
import styled from 'styled-components';
import { useResetPassword } from '../../hooks/auth/useResetPassword';

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
    const { userId, setUserId, email, setEmail, handleSubmit } =
        useResetPassword();

    return (
        <Form onSubmit={handleSubmit}>
            <h2>비밀번호 찾기</h2>
            <p>
                가입하신 아이디와 이메일 주소를 입력하시면, 인증 후 이메일로
                임시 비밀번호를 보내드립니다.
            </p>
            <Label>아이디</Label>
            <Input
                type="text"
                value={userId}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserId(e.target.value)
                }
                placeholder="아이디"
            />
            <Label>E-MAIL</Label>
            <Input
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                }
                placeholder="이메일"
            />
            <Button type="submit">비밀번호 초기화</Button>
        </Form>
    );
};

export default ResetPasswordForm;
