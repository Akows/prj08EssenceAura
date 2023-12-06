import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
  height: 100vh; /* 뷰포트 높이 전체를 사용 */
  padding-top: 60px; /* 네비게이션 바 높이만큼 패딩 추가 */
  box-sizing: border-box; /* 패딩을 높이에 포함 */
  background-color: #f7f7f7;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #5c6bc0;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3f51b5;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const SignupPage: React.FC = () => {
  return (
    <Container>
      <SignupForm>
        <Title>Sign Up</Title>
        <Input type="text" placeholder="Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Button type="submit">Sign Up</Button>
      </SignupForm>
    </Container>
  );
};

export default SignupPage;
