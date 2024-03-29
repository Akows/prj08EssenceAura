import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useResetPassword } from '../../hooks/auth/useResetPassword';
import LoadingModal from '../common/LoadingModal';

interface PasswordResetModalProps {
    closeModal: () => void;
    email: string;
    isLoading: boolean;
    setEmail: (value: string) => void;
}

const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    width: 80%;
    max-width: 500px;
    box-sizing: border-box;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin-top: 15px;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    box-sizing: border-box;
`;

const Button = styled.button`
    padding: 10px 15px;
    margin-top: 20px;
    background-color: #e44d26;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #f55f3b;
    }
`;

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({
    closeModal,
    email,
    isLoading,
    setEmail,
}) => {
    const navigate = useNavigate();
    const { handlePasswordReset, handleCancelPasswordReset } =
        useResetPassword();
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await handlePasswordReset(email, verificationCode, newPassword);
            alert('비밀번호 재설정이 완료되었습니다.');
            closeModal();
            setEmail('');

            // 재설정 성공 후 '/login' 페이지로 리디렉션
            navigate('/login');
        } catch (error) {
            alert(error);
            console.error('비밀번호 재설정 실패:', error);
        }
    };

    const handleCancel = () => {
        if (
            window.confirm(
                '비밀번호 재설정을 취소하시겠습니까? 이메일 인증은 5분 뒤에 다시 시도할 수 있습니다.'
            )
        ) {
            handleCancelPasswordReset(email);
            closeModal(); // 모달 닫기
            window.removeEventListener('beforeunload', handleBeforeUnload); // 페이지 벗어남 이벤트 리스너 제거
        } else {
            return;
        }
    };

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <>
            <ModalBackdrop>
                <ModalContainer>
                    <h2>비밀번호 재설정</h2>
                    <Form onSubmit={handleSubmit}>
                        <Label>인증코드</Label>
                        <Input
                            type="text"
                            value={verificationCode}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setVerificationCode(e.target.value)}
                        />
                        <Label>새 비밀번호</Label>
                        <Input
                            type="password"
                            value={newPassword}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setNewPassword(e.target.value)}
                        />
                        <Button type="submit" disabled={isLoading}>
                            비밀번호 변경
                        </Button>
                        <Button type="button" onClick={handleCancel}>
                            닫기
                        </Button>
                    </Form>
                </ModalContainer>
            </ModalBackdrop>

            {isLoading && <LoadingModal />}
        </>
    );
};

export default PasswordResetModal;
