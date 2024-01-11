import React from 'react';
import styled from 'styled-components';
import { UseLoginReturn } from '../../type/authtypes';

const Form = styled.form`
    margin-top: 20px;
`;

const LoginForms = styled(Form)`
    width: 50%; // 데스크톱 뷰에서는 폼이 전체 너비의 50%를 차지합니다.
    padding: 20px;

    @media (max-width: 768px) {
        width: 90%; // 모바일 뷰에서는 폼이 전체 너비를 차지합니다.
        padding: 20px 0;
    }
`;

const Label = styled.label`
    display: block;
    margin-top: 15px;
`;

const Input = styled.input`
    width: calc(100% - 20px); // 오른쪽 끝과 여백을 만들기 위해 너비를 조정
    padding: 8px;
    margin-top: 5px;
    margin-right: 10px; // 오른쪽 여백 추가
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

const LoginForm: React.FC<UseLoginReturn> = ({
    handleLogin,
    formData,
    handleChange,
    validation,
    isSubmitting,
}) => {
    return (
        <LoginForms onSubmit={handleLogin}>
            <Label htmlFor="email">이메일</Label>
            <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
            />
            {validation.email && <p>{validation.email}</p>}

            <Label htmlFor="password">비밀번호</Label>
            <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
            />
            {validation.password && <p>{validation.password}</p>}

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? '로그인 중...' : '로그인'}
            </Button>
        </LoginForms>
    );
};

export default LoginForm;
