import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LoginForm from '../../components/auth/LoginForm';
import useLogin from '../../hooks/auth/useLogin';

const LoginPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 40px;
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
    width: 800px; // 데스크톱 뷰에서의 너비
    display: flex;
    border: 1px solid #ddd;
    border-radius: 5px;

    @media (max-width: ${import.meta.env.VITE_MOBILE_SIZE}) {
        width: 100%; // 모바일 뷰에서의 너비
        flex-direction: column;
        justify-items: center;
        align-items: center;
    }
`;

const InfoContainer = styled.div`
    width: 50%; // 데스크톱 뷰에서는 정보 컨테이너가 전체 너비의 50%를 차지합니다.
    padding: 20px;

    @media (max-width: ${import.meta.env.VITE_MOBILE_SIZE}) {
        width: 90%; // 모바일 뷰에서는 정보 컨테이너가 전체 너비를 차지합니다.
        padding: 20px 0;
    }
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

const LoginPage: React.FC = () => {
    const { formData, validation, handleChange, handleLogin, isSubmitting } =
        useLogin();

    return (
        <LoginPageContainer>
            <Title>로그인</Title>
            <LoginContainer>
                {/* 로그인 입력 폼 */}
                <LoginForm
                    handleLogin={handleLogin}
                    formData={formData}
                    handleChange={handleChange}
                    validation={validation}
                    isSubmitting={isSubmitting}
                />

                {/* 회원가입, 아이디 비밀번호 찾기 버튼 */}
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
