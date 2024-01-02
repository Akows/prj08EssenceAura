import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginPageContainer = styled.div`
    display: flex;
    flex-direction: column; // 요소들을 수직으로 쌓음
    justify-content: center; // 수직 축에서 중앙 정렬
    align-items: center; // 수평 축에서 중앙 정렬
    width: 100%; // 전체 너비 사용
    height: 50vh;
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

const LoginContainer = styled.div`
    width: 1000px;
    height: 60%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ddd; // 테두리 추가
    border-radius: 5px; // 테두리 둥글게
`;

const LoginForm = styled(Form)`
    flex: 1; // 남은 공간을 모두 차지
    border-right: 1px solid #ddd; // 우측에 구분선 추가
    padding-right: 20px; // 우측 패딩 추가
    padding-left: 20px; // 좌측 패딩 추가
`;

const InfoContainer = styled.div`
    flex: 1; // 남은 공간을 모두 차지
    padding-left: 20px; // 좌측 패딩 추가
`;

const InfoText = styled.p`
    margin-bottom: 20px;
    font-size: 14px; // 필요에 따라 폰트 크기 조정
`;

const SmallButton = styled(Button)`
    padding: 10px 20px; // 버튼의 패딩을 조정하여 크기를 조정
    margin-top: 10px; // 버튼 상단의 여백 추가
    width: auto; // 버튼 너비를 자동으로 설정하여 내용에 맞춤
    background-color: #f2f2f2; // 버튼의 배경색을 변경
    color: #333; // 버튼의 텍스트 색상을 변경
    border: 1px solid #ddd; // 버튼의 테두리 추가

    &:hover {
        background-color: #eaeaea; // 호버 상태의 배경색 변경
    }
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
                    <SmallButton>
                        <Link to="/signup">회원가입</Link>
                    </SmallButton>

                    <InfoText>
                        아이디 혹은 비밀번호를 잊으셨나요?
                        <br />
                        간단한 정보를 입력 후 잃어버린 정보를 찾으실 수
                        있습니다.
                    </InfoText>
                    <SmallButton>
                        <Link to="/find">아이디/비밀번호 찾기</Link>
                    </SmallButton>
                </InfoContainer>
            </LoginContainer>
        </LoginPageContainer>
    );
};

export default LoginPage;
