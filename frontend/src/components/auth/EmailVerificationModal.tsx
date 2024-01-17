import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { EmailVerificationModalProps } from '../../type/authtypes';
import LoadingModal from '../common/LoadingModal';

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
    handleVerifyEmailCode,
    setIsVerified,
    handleCancelSignUp,
}) => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = '';
    };

    const [verificationCode, setVerificationCode] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await handleVerifyEmailCode(verificationCode);
            alert('이메일 인증이 완료되었습니다.');
            setIsVerified(true); // 인증 상태 업데이트
            setIsLoading(false);
            closeModal();
        } catch (error) {
            alert('인증 코드가 잘못되었습니다. 다시 시도해주세요.');
            setIsLoading(false);
            console.error('인증 실패:', error);
        }
    };

    const handleCancel = () => {
        if (
            window.confirm(
                '가입을 취소하시겠습니까? 이메일 인증은 5분 뒤에 다시 시도할 수 있습니다.'
            )
        ) {
            handleCancelSignUp(); // 취소 함수 호출
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
                    <h2>이메일 인증</h2>
                    <p>
                        등록하신 이메일 주소로 발송된 인증코드를 입력해주세요.
                    </p>
                    <Form onSubmit={handleSubmit}>
                        <Label>인증코드</Label>
                        <Input
                            type="text"
                            value={verificationCode}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setVerificationCode(e.target.value)}
                        />
                        <Button type="submit">인증 확인</Button>
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

export default EmailVerificationModal;
