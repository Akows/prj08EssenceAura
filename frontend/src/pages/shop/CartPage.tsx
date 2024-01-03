import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CartItem from '../../components/shop/CartItem';

const CartContainer = styled.div`
    padding: 20px;
    width: 100%; // 화면 전체 폭을 사용하도록 변경
    margin: 10px 40px; // 좌우 중앙 정렬을 위해 변경

    @media (max-width: 768px) {
        margin: 20px 20px; // 모바일 환경에서의 마진 조정
        padding: 10px; // 모바일 환경에서의 패딩 조정
    }
`;

const Breadcrumb = styled.div`
    font-size: 12px;
    color: #666;
    margin-top: 20px;
`;

const CartTitle = styled.h1`
    font-size: 24px;
    color: #333;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
`;

const CartTable = styled.table`
    width: 100%;
    margin-top: 20px;
    border-collapse: collapse;

    @media (max-width: 768px) {
        // 모바일 환경에서 테이블 스타일 조정
        // 예를 들어, 폰트 크기, 셀 패딩 등
    }
`;

const CartHeader = styled.th`
    text-align: left;
    padding: 8px;
    background: #f7f7f7;
    color: #333;
    border-bottom: 1px solid #ccc;
`;

const TotalPrice = styled.div`
    text-align: right;
    margin-top: 20px;
    font-size: 20px;
    color: #e44d26;
`;

const Button = styled.button`
    width: 135px;
    height: 50px;
    background-color: #e44d26; // 버튼 배경 색상 변경
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    margin-right: 10px;

    & > a {
        text-decoration: none;
        color: white;
        font-size: 16px;
        border: 2px black solid;
    }

    &:hover {
        background-color: #f55f3b; // 호버 효과 색상 변경
    }

    &:last-child {
        margin-right: 0;
    }

    // 모바일 환경에서 버튼 스타일 조정
    @media (max-width: 768px) {
        width: 100%; // 모바일 화면에서 버튼의 폭을 전체로 확장
        margin-top: 10px; // 버튼 사이의 마진 조정
        margin-right: 0; // 버튼 사이의 오른쪽 마진 제거
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
            <Breadcrumb>쇼핑몰 {'>'} 장바구니</Breadcrumb>

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
                <Button>
                    <Link to="/shop">계속 쇼핑하기</Link>
                </Button>
                <Button>
                    <Link to="/checkout">결제하기</Link>
                </Button>
            </div>
        </CartContainer>
    );
};

export default CartPage;
