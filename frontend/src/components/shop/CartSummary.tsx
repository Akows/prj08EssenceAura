import React from 'react';
import styled from 'styled-components';

const SummaryContainer = styled.section`
    margin-top: 20px;
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 8px;
`;

const SummaryTitle = styled.h2`
    margin-bottom: 20px;
    text-align: center;
`;

const SummaryItem = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const SummaryItemLabel = styled.span`
    font-weight: 500;
`;

const SummaryItemValue = styled.span`
    font-weight: bold;
`;

const TotalAmount = styled.div`
    font-size: 1.5em;
    text-align: right;
`;

interface CartItem {
    product_id: number;
    imageUrl: string;
    name: string;
    final_price: number;
    quantity: number;
}

interface CartSummaryProps {
    cartItems: CartItem[];
}

const CartSummary: React.FC<CartSummaryProps> = ({ cartItems }) => {
    // 총 가격을 계산하는 함수
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + parseFloat(item.final_price) * item.quantity;
        }, 0);
    };

    // 총 가격을 계산합니다.
    const totalPrice = calculateTotalPrice();

    // 총 가격을 현지화된 문자열로 형식화합니다.
    const formattedTotalPrice = totalPrice.toLocaleString();

    return (
        <SummaryContainer>
            <SummaryTitle>Order Summary</SummaryTitle>
            {cartItems.map((item) => (
                <SummaryItem key={item.product_id}>
                    <SummaryItemLabel>{item.name}</SummaryItemLabel>
                    <SummaryItemValue>
                        {parseInt(item.final_price).toLocaleString()}원 x
                        {item.quantity}개
                    </SummaryItemValue>
                </SummaryItem>
            ))}
            <TotalAmount>총합: {formattedTotalPrice}원</TotalAmount>
        </SummaryContainer>
    );
};

export default CartSummary;
