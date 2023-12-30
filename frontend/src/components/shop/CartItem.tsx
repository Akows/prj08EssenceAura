import React from 'react';
import styled from 'styled-components';

const ItemRow = styled.tr``;

const ItemImage = styled.img`
    width: 50px; // 이미지 크기는 디자인에 맞게 조정
`;

const ItemDescription = styled.td`
    padding: 8px;
`;

const QuantityInput = styled.input`
    width: 40px; // 수량 입력란의 너비
`;

const Price = styled.td`
    // 가격을 표시할 스타일
`;

const RemoveButton = styled.button`
    background: none;
    border: none;
    color: red;
    cursor: pointer;
`;

// CartItem 컴포넌트의 props 타입 정의
interface CartItemProps {
    item: {
        id: number;
        imageUrl: string;
        title: string;
        price: number;
        quantity: number;
    };
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
    item,
    onUpdateQuantity,
    onRemove,
}) => {
    const { id, imageUrl, title, price, quantity } = item;

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 입력 값에 따라 수량을 업데이트하는 로직
        const newQuantity = parseInt(e.target.value, 10);
        onUpdateQuantity(id, newQuantity);
    };

    return (
        <ItemRow>
            <ItemDescription>
                <ItemImage src={imageUrl} alt={title} />
                {title}
            </ItemDescription>
            <ItemDescription>
                <QuantityInput
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                />
            </ItemDescription>
            <Price>{`${price.toLocaleString()}원`}</Price>
            {/* 배송비 등 다른 정보 필요한 경우 추가 */}
            <ItemDescription>
                <RemoveButton onClick={() => onRemove(id)}>삭제</RemoveButton>
            </ItemDescription>
        </ItemRow>
    );
};

export default CartItem;
