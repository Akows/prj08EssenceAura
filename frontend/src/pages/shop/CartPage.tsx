import React, { useState } from 'react';
import styled from 'styled-components';
import CartItem from '../../components/shop/CartItem';

const CartContainer = styled.div`
    padding: 20px;
`;

const CartTitle = styled.h1`
    font-size: 24px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
`;

const CartTable = styled.table`
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;
`;

const CartHeader = styled.th`
    text-align: left;
    padding: 8px;
    background: #f7f7f7;
    border-bottom: 1px solid #ccc;
`;

// const CartItem = styled.tr`
//     &:nth-child(even) {
//         background: #f7f7f7;
//     }
// `;

// const CartCell = styled.td`
//     padding: 8px;
//     border-bottom: 1px solid #ccc;
// `;

const TotalPrice = styled.div`
    text-align: right;
    margin-top: 20px;
    font-size: 20px;
`;

const Button = styled.button`
    padding: 10px 20px;
    margin-right: 10px;
    border: none;
    background-color: #000;
    color: #fff;
    cursor: pointer;

    &:last-child {
        margin-right: 0;
    }
`;

const cartData = [
    {
        id: 1,
        imageUrl: 'path/to/image1.png',
        title: '향수 A',
        price: 38000,
        quantity: 1,
        available: true,
    },
    {
        id: 2,
        imageUrl: 'path/to/image2.png',
        title: '향수 B',
        price: 42000,
        quantity: 2,
        available: true,
    },
    {
        id: 3,
        imageUrl: 'path/to/image3.png',
        title: '향수 C',
        price: 56000,
        quantity: 1,
        available: false, // 재고 없음을 표시
    },
];

const CartPage: React.FC = () => {
    // 예제 상품 데이터, 실제로는 API 호출 결과나 상태 관리 라이브러리에서 가져올 것임
    const [cartItems, setCartItems] = useState(cartData);

    // 상품 수량 변경 핸들러
    const handleUpdateQuantity = (id, quantity) => {
        // 상품의 수량을 업데이트하는 로직
    };

    // 상품 삭제 핸들러
    const handleRemoveItem = (id) => {
        // 상품을 장바구니에서 삭제하는 로직
    };

    return (
        <CartContainer>
            <CartTitle>장바구니</CartTitle>
            <CartTable>
                <thead>
                    <tr>
                        <CartHeader>제품</CartHeader>
                        <CartHeader>수량</CartHeader>
                        <CartHeader>가격</CartHeader>
                        <CartHeader>배송비</CartHeader>
                        <CartHeader>삭제</CartHeader>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onUpdateQuantity={handleUpdateQuantity}
                            onRemove={handleRemoveItem}
                        />
                    ))}
                </tbody>
            </CartTable>
            <TotalPrice>총 구매금액: 370,000원</TotalPrice>
            <div>
                <Button>주문하기</Button>
                <Button>계속 쇼핑하기</Button>
                <Button>결제하기</Button>
            </div>
        </CartContainer>
    );
};

export default CartPage;
