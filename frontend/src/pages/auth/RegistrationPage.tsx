import React, { useState } from 'react';
import styled from 'styled-components';

// Styled Components
const RegistrationContainer = styled.div`
    margin: auto;
    max-width: 800px;
`;

const Title = styled.h1`
    text-align: center;
    margin-top: 20px;
`;

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

const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    margin-top: 15px;
`;

const Checkbox = styled.input`
    margin-right: 10px;
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

// React Component
const RegistrationPage = () => {
    // ... 상태 정의 및 이벤트 핸들러 정의 ...

    // 예시로 사용자가 입력한 값 저장
    const [userDetails, setUserDetails] = useState({
        name: '',
        userId: '',
        password: '',
        confirmPassword: '',
        birthday: '',
        address: '',
        detailAddress: '',
        phone: '',
        email: '',
    });

    // 예시로 유효성 검사 메시지
    const [validation, setValidation] = useState({
        userId: '',
        email: '',
    });

    // 이벤트 핸들러 함수 정의
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserDetails({ ...userDetails, [name]: value });
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
            <Form>
                <Label htmlFor="name">이름</Label>
                <Input
                    id="name"
                    type="text"
                    value={userDetails.name}
                    onChange={handleChange}
                />

                <Label htmlFor="userId">아이디</Label>
                <Input
                    id="userId"
                    type="text"
                    value={userDetails.userId}
                    onChange={handleChange}
                />
                <Button type="button">중복 확인</Button>
                <ValidationMessage>{validation.userId}</ValidationMessage>

                <Label htmlFor="password">비밀번호</Label>
                <Input
                    id="password"
                    type="password"
                    value={userDetails.password}
                    onChange={handleChange}
                />

                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                <Input
                    id="confirmPassword"
                    type="password"
                    value={userDetails.confirmPassword}
                    onChange={handleChange}
                />

                <Label htmlFor="birthday">생년월일</Label>
                <Input
                    id="birthday"
                    type="text"
                    value={userDetails.birthday}
                    onChange={handleChange}
                />

                <Label htmlFor="address">주소</Label>
                <Input
                    id="address"
                    type="text"
                    value={userDetails.address}
                    onChange={handleChange}
                />

                <Label htmlFor="detailAddress">상세주소</Label>
                <Input
                    id="detailAddress"
                    type="text"
                    value={userDetails.detailAddress}
                    onChange={handleChange}
                />

                <Label htmlFor="phone">연락처</Label>
                <Input
                    id="phone"
                    type="tel"
                    value={userDetails.phone}
                    onChange={handleChange}
                />

                <Label htmlFor="email">이메일</Label>
                <Input
                    id="email"
                    type="email"
                    value={userDetails.email}
                    onChange={handleChange}
                />
                <Button type="button">중복 확인</Button>
                <ValidationMessage>{validation.email}</ValidationMessage>

                <Button type="submit">회원가입</Button>
            </Form>
        </RegistrationContainer>
    );
};

export default RegistrationPage;
