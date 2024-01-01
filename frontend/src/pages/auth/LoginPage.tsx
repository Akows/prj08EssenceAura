import React, { useState } from 'react';
import styled from 'styled-components';

const LoginPageContainer = styled.div`
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

const LoginContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-top: 20px;
`;

const LoginForm = styled.div`
    width: 48%;
    box-sizing: border-box; // 패딩과 보더가 너비에 포함되도록 설정
`;

const InfoContainer = styled.div`
    width: 48%;
    padding: 20px;
    margin-left: 4%; // LoginForm과 InfoContainer 사이의 여백 추가
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box; // 패딩과 보더가 너비에 포함되도록 설정
`;

const InfoText = styled.p`
    margin-bottom: 20px;
`;

const SmallButton = styled(Button)`
    padding: 10px 15px;
    width: auto;
    display: inline-block;
`;

const LoginPage = () => {
    const [loginDetails, setLoginDetails] = useState({
        userId: '',
        password: '',
    });

    // 입력 핸들러
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginDetails({ ...loginDetails, [name]: value });
    };

    // 로그인 버튼 클릭 핸들러
    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // 로그인 로직 구현 (예: 서버에 로그인 요청)
        alert('로그인 처리 로직을 여기에 구현합니다.');
    };

    return (
        <LoginPageContainer>
            <Title>로그인</Title>
            <LoginContainer>
                <LoginForm onSubmit={handleLogin}>
                    <Label htmlFor="userId">아이디</Label>
                    <Input
                        id="userId"
                        name="userId"
                        type="text"
                        value={loginDetails.userId}
                        onChange={handleChange}
                    />

                    <Label htmlFor="password">비밀번호</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        value={loginDetails.password}
                        onChange={handleChange}
                    />
                    <Button type="submit">로그인</Button>
                </LoginForm>

                <InfoContainer>
                    <InfoText>
                        아직 회원이 아니신가요?
                        <br />
                        회원가입을 하시면 다양한 혜택을 편리하게 이용하실 수
                        있습니다.
                    </InfoText>
                    <SmallButton>회원가입</SmallButton>

                    <InfoText>
                        아이디 혹은 비밀번호를 잊으셨나요?
                        <br />
                        간단한 정보를 입력 후 잃어버린 정보를 찾으실 수
                        있습니다.
                    </InfoText>
                    <SmallButton>아이디/비밀번호 찾기</SmallButton>
                </InfoContainer>
            </LoginContainer>
        </LoginPageContainer>
    );
};

export default LoginPage;
