import React from 'react';
import styled from 'styled-components';
import { Order } from './OrderManagement';

// OrderModal props의 타입 정의
interface OrderModalProps {
    order: Order;
    onClose: () => void;
    onSave: (order: Order) => void;
}

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalBody = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 50%; // 모달의 너비
    max-width: 500px;
    z-index: 1001;
`;

const CloseButton = styled.button`
    float: right;
    border: none;
    background: none;
    font-size: 1.5em;
    cursor: pointer;
`;

const FormField = styled.div`
    margin-bottom: 10px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const ActionButton = styled.button`
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &.save {
        background-color: #4caf50;
        color: white;
        margin-right: 10px;
    }

    &.cancel {
        background-color: #f44336;
        color: white;
    }
`;

const OrderModal: React.FC<OrderModalProps> = ({ order, onClose, onSave }) => {
    return (
        <ModalOverlay>
            <ModalBody>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <h2>주문 수정</h2>
                <FormField>
                    <Label>주문 ID</Label>
                    <Input type="text" defaultValue={order.order_id} readOnly />
                </FormField>
                <FormField>
                    <Label>총액</Label>
                    <Input type="number" defaultValue={order.total_price} />
                </FormField>
                <FormField>
                    <ActionButton
                        className="save"
                        onClick={() => onSave(order)}
                    >
                        저장
                    </ActionButton>
                    <ActionButton className="cancel" onClick={onClose}>
                        취소
                    </ActionButton>
                </FormField>
            </ModalBody>
        </ModalOverlay>
    );
};

export default OrderModal;
