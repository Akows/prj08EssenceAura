import React, { useState } from 'react';
import styled from 'styled-components';
import { useModal } from '../../hooks/auth/useModal';
import { useResetPassword } from '../../hooks/auth/useResetPassword';
import LoadingModal from '../common/LoadingModal';
import PasswordResetModal from './PasswordResetModal';

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

const ResetPasswordForm: React.FC = () => {
    const { isLoading, handlePasswordResetRequest } = useResetPassword();
    const { closeModal, openModal, isVisible } = useModal();
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            alert('이메일을 입력해주세요.');
            return;
        }

        try {
            await handlePasswordResetRequest(email);
            alert(
                '이메일이 발송되었습니다. 인증 코드와 새 비밀번호를 입력해주세요.'
            );
            openModal(); // 이메일 인증 요청 후 모달 열기
        } catch (error) {
            setEmail('');
            if (error instanceof Error) {
                alert(error.message);
            } else {
                // error가 Error 타입이 아닌 경우의 처리
                console.error('알 수 없는 에러가 발생하였습니다.', error);
            }
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h2>비밀번호 재설정</h2>
                <p>
                    가입하신 이메일 주소를 입력하시면, 이메일로 인증 코드를
                    발송합니다.
                </p>
                <Label>E-MAIL</Label>
                <Input
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                    }
                    placeholder="이메일 주소 입력"
                />
                <Button type="submit" disabled={isLoading}>
                    비밀번호 재설정 이메일 보내기
                </Button>
            </Form>
            {isVisible && (
                <PasswordResetModal
                    closeModal={closeModal}
                    email={email}
                    isLoading={isLoading}
                    setEmail={setEmail}
                />
            )}
            {isLoading && <LoadingModal />}
        </>
    );
};

export default ResetPasswordForm;
