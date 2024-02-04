import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CheckoutContainer = styled.div`
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 30px;
    font-family: 'Open Sans', sans-serif;
`;

const SectionTitle = styled.h2`
    color: #333;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 10px;
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #eaeaea;
    border-radius: 4px;
    margin-bottom: 10px;
`;

const SummaryContainer = styled.div`
    margin-top: 20px;
`;

const ProductSummary = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const ProductName = styled.span`
    font-weight: bold;
`;

const ProductPrice = styled.span`
    color: #e44d26;
    font-weight: bold;
`;

const TotalPrice = styled.div`
    font-size: 18px;
    text-align: right;
    margin-top: 20px;
`;

const ConfirmButton = styled.button`
    background-color: #e44d26;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #f55f3b;
    }
`;

const CheckoutPage: React.FC = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const location = useLocation();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (window.confirm('제품을 주문하시겠습니까?')) {
            navigate('');
        } else {
            return;
        }

        // 결제 처리 로직
    };

    useEffect(() => {
        // 상품 상세 페이지에서 넘어온 데이터가 있는지 확인
        const productFromDetailPage = location.state?.product;
        const quantityFromDetailPage = location.state?.quantity;

        if (productFromDetailPage && quantityFromDetailPage) {
            // 상품 상세 페이지에서 넘어온 데이터를 기반으로 결제 항목 설정
            setCartItems([
                { ...productFromDetailPage, quantity: quantityFromDetailPage },
            ]);
            setTotalPrice(
                productFromDetailPage.final_price * quantityFromDetailPage
            );
        } else {
            // 장바구니 페이지에서 넘어온 데이터를 로컬 스토리지에서 불러옴
            const cartFromLocalStorage = JSON.parse(
                localStorage.getItem('cart') || '[]'
            );
            const totalFromLocalStorage = JSON.parse(
                localStorage.getItem('totalPrice') || '0'
            );

            setCartItems(cartFromLocalStorage);
            setTotalPrice(totalFromLocalStorage);
        }

        console.log(cartItems);
        console.log(totalPrice);
    }, [location]);

    return (
        <CheckoutContainer>
            <SectionTitle>결제 정보</SectionTitle>
            <Form onSubmit={handleSubmit}>
                <Input placeholder="이름" value={userInfo.username} readOnly />
                <Input
                    placeholder="이메일 주소"
                    value={userInfo.email}
                    readOnly
                />
                {/* 추가 필요한 필드 */}
                {/* 결제 방법 및 기타 정보 입력 필드 */}
            </Form>
            <SummaryContainer>
                <SectionTitle>주문 요약</SectionTitle>
                {cartItems.map((item) => (
                    <ProductSummary key={item.product_id}>
                        <ProductName>{item.name}</ProductName>
                        <ProductPrice>
                            {parseFloat(item.final_price.toLocaleString())}원 x{' '}
                            {item.quantity}
                        </ProductPrice>
                    </ProductSummary>
                ))}
                <TotalPrice>총합: {totalPrice.toLocaleString()}원</TotalPrice>
            </SummaryContainer>
            <ConfirmButton type="submit">결제 확인</ConfirmButton>
        </CheckoutContainer>
    );
};

export default CheckoutPage;
