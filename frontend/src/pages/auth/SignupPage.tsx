import React, { useState } from 'react';
import styled from 'styled-components';
import { validateAuthInput } from '../../utils/auth';

interface ValidationErrors {
  username?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
}

const Container = styled.div`
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: center; /* 가로 중앙 정렬 */
  height: 100vh; /* 뷰포트 높이 전체를 사용 */
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

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateAuthInput(formData, true);
    setErrors(validationErrors);
    console.log(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('회원가입 성공:', formData);
    }
  };

  return (
    <Container>
      <SignupForm onSubmit={handleSubmit}>
        <Title>Sign Up</Title>
        <Input type="text" placeholder="Name" name="username" value={formData.username} onChange={handleChange} />
        {errors.username && <p>{errors.username}</p>}
        <Input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p>{errors.email}</p>}
        <Input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
        {errors.password && <p>{errors.password}</p>}
        <Input type="password" placeholder="Confirm Password" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} />
        {errors.passwordConfirm && <p>{errors.passwordConfirm}</p>}
        <Button type="submit">Sign Up</Button>
      </SignupForm>
    </Container>
  );
};

export default SignupPage;
