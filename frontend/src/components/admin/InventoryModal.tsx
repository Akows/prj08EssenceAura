import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Product } from '../../redux/admin/adminThunks';

// InventoryModal props의 타입 정의
interface InventoryModalProps {
    product: Product | null;
    onClose: () => void;
    onSave: (productData: Product) => void;
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
    padding: 30px;
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
    width: 95%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const Input = styled.input`
    width: 95%;
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
    const [formData, setFormData] = useState<Product>({
        name: '',
        description: '',
        price: 0,
        category: '',
        tags: '',
        stock: 0,
        image_url: '',
        created_at: '',
        what_event: '',
        discount_rate: 0,
    });

    useEffect(() => {
        // 기존 제품 데이터로 폼 초기화
        if (product) {
            setFormData({ ...product });
        }
    }, [product]);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (window.confirm('상품을 수정하시겠습니까?')) {
            onSave(formData);
        }
    };

    return (
        <ModalOverlay>
            <ModalBody>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <h2>{product ? '제품 수정' : '제품 추가'}</h2>

                <FormField>
                    <Label>이름</Label>
                    <Input
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField>
                    <Label>설명</Label>
                    <Textarea
                        name="description"
                        value={formData.description || ''}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField>
                    <Label>가격</Label>
                    <Input
                        name="price"
                        type="number"
                        value={formData.price || ''}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField>
                    <Label>카테고리</Label>
                    <Input
                        name="category"
                        value={formData.category || ''}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField>
                    <Label>태그</Label>
                    <Input
                        name="tags"
                        value={formData.tags || ''}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField>
                    <Label>재고 수량</Label>
                    <Input
                        name="stock"
                        type="number"
                        value={formData.stock || 0}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField>
                    <Label>이미지 URL</Label>
                    <Input
                        name="image_url"
                        value={formData.image_url || ''}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField>
                    <Label>이벤트 분류</Label>
                    <Input
                        name="what_event"
                        value={formData.what_event || ''}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField>
                    <Label>할인율</Label>
                    <Input
                        name="discount_rate"
                        type="number"
                        value={formData.discount_rate || 0}
                        onChange={handleChange}
                    />
                </FormField>

                <FormField>
                    <ActionButton className="save" onClick={handleSave}>
                        {product ? '정보 수정' : '제품 추가'}
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
