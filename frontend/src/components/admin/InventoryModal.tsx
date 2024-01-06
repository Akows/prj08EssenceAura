import React, { useState } from 'react';
import styled from 'styled-components';
import { Product } from './InventoryManagement';

// InventoryModal props의 타입 정의
interface InventoryModalProps {
    product: Product | null;
    onClose: () => void;
    onSave: (productData: Partial<Product>) => void;
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

const Textarea = styled.textarea`
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
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

const InventoryModal: React.FC<InventoryModalProps> = ({
    product,
    onClose,
    onSave,
}) => {
    // 폼 입력을 위한 상태 관리
    const [formData, setFormData] = useState<Partial<Product>>(product || {});

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <ModalOverlay>
            <ModalBody>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <h2>{product ? '제품 수정' : '제품 추가'}</h2>
                {/* Form fields for product details */}
                <FormField>
                    <Label>이름</Label>
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </FormField>
                <FormField>
                    <Label>설명</Label>
                    <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </FormField>
                {/* ... 다른 필드들 ... */}
                <FormField>
                    <ActionButton className="save" onClick={handleSave}>
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

export default InventoryModal;
