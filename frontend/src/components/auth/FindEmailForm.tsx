import React from 'react';
import styled from 'styled-components';
import { useFindEmail } from '../../hooks/auth/useFindEmail';

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

const FindEmailForm: React.FC = () => {
    const { name, setName, phone, setPhone, email, error, handleSubmit } =
        useFindEmail();

    return (
        <Form onSubmit={handleSubmit}>
            <h2>이메일 찾기</h2>
            <p>
                회원가입 시, 입력하신 이름과 전화번호로 가입된 이메일을 찾을 수
                있습니다.
            </p>
            <Label>이름</Label>
            <Input
                type="text"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                }
                placeholder="이름을 입력하세요"
            />
            <Label>전화번호</Label>
            <Input
                type="text"
                value={phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPhone(e.target.value)
                }
                placeholder="전화번호를 입력하세요"
            />
            <Button type="submit">이메일 찾기</Button>
            {email && <p>회원님의 이메일 : {email}</p>}
            {error && <p>{error}</p>}
        </Form>
    );
};

export default FindEmailForm;
