import React from 'react';
import styled from 'styled-components';

// 모달의 props 타입 정의
interface ModalProps {
    title: string;
    children: React.ReactNode;
    onClose: () => void;
    onConfirm?: () => void;
    showConfirmButton?: boolean;
}

const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContainer = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    min-width: 300px;
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
    margin: 0;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 1.2em;
    cursor: pointer;
`;

const ModalContent = styled.div`
    margin-bottom: 20px;
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const Button = styled.button`
    padding: 10px 15px;
    background-color: #e44d26;
    color: white;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: #f55f3b;
    }
`;

const AlertConfirmModal: React.FC<ModalProps> = ({
    title,
    children,
    onClose,
    onConfirm,
    showConfirmButton = true,
}) => {
    return (
        <ModalBackdrop>
            <ModalContainer>
                <ModalHeader>
                    <ModalTitle>{title}</ModalTitle>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </ModalHeader>
                <ModalContent>{children}</ModalContent>
                <ModalFooter>
                    {showConfirmButton && (
                        <Button onClick={onConfirm}>확인</Button>
                    )}
                    <Button onClick={onClose}>취소</Button>
                </ModalFooter>
            </ModalContainer>
        </ModalBackdrop>
    );
};

export default AlertConfirmModal;
