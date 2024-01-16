import React, { useState } from 'react';
import styled from 'styled-components';

// closeModal 함수의 타입을 정의하는 Props 인터페이스
interface EmailVerificationModalProps {
    closeModal: () => void;
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

const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({
    closeModal,
    requestVerificationCode, // 이메일 인증 코드 요청 함수
    verifyCode, // 인증 코드 검증 함수
    email, // 사용자 이메일
}) => {
    const [verificationCode, setVerificationCode] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // 인증 코드 검증 로직을 여기에 추가
        try {
            await verifyCode(email, verificationCode);
            // 인증 성공 처리
            closeModal(); // 모달 닫기
        } catch (error) {
            // 인증 실패 처리
            console.error('인증 실패:', error);
        }
    };

    return (
        <ModalBackdrop>
            <ModalContainer>
                <h2>이메일 인증</h2>
                <p>등록하신 이메일 주소로 발송된 인증코드를 입력해주세요.</p>
                <Form onSubmit={handleSubmit}>
                    <Label>인증코드</Label>
                    <Input
                        type="text"
                        value={verificationCode}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setVerificationCode(e.target.value)
                        }
                    />
                    <Button type="submit">인증 확인</Button>
                    <Button onClick={closeModal}>닫기</Button>
                </Form>
            </ModalContainer>
        </ModalBackdrop>
    );
};

export default EmailVerificationModal;
