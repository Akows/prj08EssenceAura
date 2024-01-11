import React from 'react';
import styled from 'styled-components';
import useSignup from '../../hooks/auth/useSignup';

const Form = styled.form`
    margin-top: 20px;
`;

const Label = styled.label`
    display: block;
    margin-top: 15px;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
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

const ValidationMessage = styled.div`
    color: red;
    margin-top: 5px;
`;

const RegistrationForm: React.FC = () => {
    const { formData, validation, handleChange, handleSignup } = useSignup();

    return (
        <Form onSubmit={handleSignup}>
            <Label htmlFor="username">이름</Label>
            <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
            />
            <ValidationMessage>{validation.username}</ValidationMessage>

            <Label htmlFor="email">이메일</Label>
            <Input
                id="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
            />
            <ValidationMessage>{validation.email}</ValidationMessage>
            <Button type="button">이메일 중복 확인</Button>

            <Label htmlFor="password">비밀번호</Label>
            <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
            />
            <ValidationMessage>{validation.password}</ValidationMessage>

            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
            />
            <ValidationMessage>{validation.confirmPassword}</ValidationMessage>

            <Label htmlFor="address">주소</Label>
            <Input
                id="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
            />
            <ValidationMessage>{validation.address}</ValidationMessage>

            <Label htmlFor="building_name">상세주소</Label>
            <Input
                id="building_name"
                type="text"
                value={formData.building_name}
                onChange={handleChange}
            />
            <ValidationMessage>{validation.building_name}</ValidationMessage>

            <Label htmlFor="phone_number">연락처</Label>
            <Input
                id="phone_number"
                type="tel"
                value={formData.phone_number}
                onChange={handleChange}
            />
            <ValidationMessage>{validation.phone_number}</ValidationMessage>

            <Button type="submit">회원가입</Button>
        </Form>
    );
};

export default RegistrationForm;
