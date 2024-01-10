import React, { useState } from 'react';
import styled from 'styled-components';

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

const RegistrationForm: React.FC = ({ onSignup }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '', // 유효성 검사용, 데이터베이스에는 저장되지 않음
        address: '',
        building_name: '',
        unit_number: '',
        phone_number: '',
    });

    const [validation, setValidation] = useState({
        userId: '',
        email: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 폼 유효성 검사 로직
        // 유효성 검사를 통과하면 onSignup 함수를 호출
        onSignup(formData);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Label htmlFor="name">이름</Label>
            <Input
                id="name"
                type="text"
                value={formData.username}
                onChange={handleChange}
            />

            <Label htmlFor="userId">이메일</Label>
            <Input
                id="userId"
                type="text"
                value={formData.email}
                onChange={handleChange}
            />
            <Button type="button">중복 확인</Button>
            <ValidationMessage>{validation.userId}</ValidationMessage>

            <Label htmlFor="password">비밀번호</Label>
            <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
            />

            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
            />

            <Label htmlFor="birthday">생년월일</Label>
            <Input
                id="birthday"
                type="text"
                value={formData.birthday}
                onChange={handleChange}
            />

            <Label htmlFor="address">주소</Label>
            <Input
                id="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
            />

            <Label htmlFor="detailAddress">상세주소</Label>
            <Input
                id="detailAddress"
                type="text"
                value={formData.detailAddress}
                onChange={handleChange}
            />

            <Label htmlFor="phone">연락처</Label>
            <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
            />

            <Label htmlFor="email">이메일</Label>
            <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
            />
            <Button type="button">중복 확인</Button>
            <ValidationMessage>{validation.email}</ValidationMessage>

            <Button type="submit">회원가입</Button>
        </Form>
    );
};

export default RegistrationForm;
