import React, { useState } from 'react';
import styled from 'styled-components';
import { FormData, RegistrationFormProps } from '../../type/types';
import { validateSignupForm } from '../../utils/auth';

// 유효성 검사를 위한 에러 메시지 인터페이스
export interface FormErrors {
    email?: string;
    password?: string;
    confirmPassword?: string;
    // 기타 필드에 대한 에러 메시지 정의
}

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

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSignup }) => {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '', // 유효성 검사용, 데이터베이스에는 저장되지 않음
        address: '',
        building_name: '',
        phone_number: '',
    });

    // 유효성 검사 결과를 받아와서 저장하는 useState
    const [validation, setValidation] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateSignupForm(formData);

        if (Object.keys(errors).length === 0) {
            onSignup(formData);
        } else {
            setValidation(errors);
        }
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
            <ValidationMessage>{validation.email}</ValidationMessage>

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
            <ValidationMessage>{validation.password}</ValidationMessage>

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
                value={formData.building_name}
                onChange={handleChange}
            />

            <Label htmlFor="phone">연락처</Label>
            <Input
                id="phone"
                type="tel"
                value={formData.phone_number}
                onChange={handleChange}
            />

            <Button type="button">중복 확인</Button>
            <ValidationMessage>{validation.email}</ValidationMessage>

            <Button type="submit">회원가입</Button>
        </Form>
    );
};

export default RegistrationForm;
