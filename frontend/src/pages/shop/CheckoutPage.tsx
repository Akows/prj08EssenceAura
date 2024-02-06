import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createOrder } from '../../redux/order/orderThunk';

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
    const dispatch = useDispatch();
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // 상품 상세 페이지에서 넘어온 데이터가 있는지 확인
    const productFromDetailPage = location.state?.product;
    const quantityFromDetailPage = location.state?.quantity;

    const handleSubmit = () => {
        if (window.confirm('제품을 주문하시겠습니까?')) {
            // 장바구니를 통한 결제인 경우, 결제가 동작하는 시점에 장바구니 데이터를 삭제
            if (!productFromDetailPage && !quantityFromDetailPage) {
                localStorage.removeItem('cart');
                localStorage.removeItem('totalPrice');
            }

            const orderData = {
                user_id: userInfo.user_id,
                username: userInfo.username,
                email: userInfo.email,
                delivery_address: '임시주소',
                items: cartItems.map((item) => ({
                    product_id: item.product_id,
                    product_name: item.name,
                    quantity: item.quantity,
                    price: item.final_price,
                })),
                total_price: totalPrice,
            };

            dispatch(createOrder(orderData));
            navigate('/confirm', {
                state: {
                    status: '주문 생성',
                    message: '주문이 성공적으로 완료되었습니다.',
                },
            });
        } else {
            return;
        }
    };

    useEffect(() => {
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
    }, [location]);

    return (
        <CheckoutContainer>
            <SectionTitle>결제 정보</SectionTitle>
            <Form>
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
            <ConfirmButton onClick={handleSubmit}>결제 확인</ConfirmButton>
        </CheckoutContainer>
    );
};

export default CheckoutPage;
