import React from 'react';
import styled from 'styled-components';
import { useFindId } from '../../hooks/auth/useFindId';

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

const FindIdForm: React.FC = () => {
    const { name, setName, email, setEmail, handleSubmit } = useFindId();

    return (
        <Form onSubmit={handleSubmit}>
            <h2>아이디 찾기</h2>
            <p>
                회원가입 시, 입력하신 이름 + 이메일을 통해 찾을 수 있는 방법으로
                아이디를 확인하실 수 있습니다.
            </p>
            <Label>이름</Label>
            <Input
                type="text"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                }
                placeholder="이름"
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
            <Button type="submit">아이디 찾기</Button>
        </Form>
    );
};

export default FindIdForm;
