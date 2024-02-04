import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CartItemList from '../../components/shop/CartItemList';
import CartSummary from '../../components/shop/CartSummary';

const CartContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
`;

const ActionSection = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const Button = styled(Link)`
    display: inline-block;
    padding: 10px 20px;
    background-color: #e44d26;
    color: white;
    text-decoration: none;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #f55f3b;
    }
`;

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState([]);

    // 총 가격 계산 및 로컬 스토리지에 저장
    const calculateAndSaveTotalPrice = (cartItems) => {
        const totalPrice = cartItems.reduce((total, item) => {
            return total + parseFloat(item.final_price) * item.quantity;
        }, 0);
        localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
        return totalPrice;
    };

    // 장바구니가 변경되었을 때 호출됩니다.
    const handleCartChange = (updatedCartItems) => {
        setCartItems(updatedCartItems);
        calculateAndSaveTotalPrice(updatedCartItems);
    };

    useEffect(() => {
        const savedCartItems = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(savedCartItems);
        calculateAndSaveTotalPrice(savedCartItems);
    }, []);

    return (
        <CartContainer>
            <h1>장바구니</h1>
            <CartItemList
                cartItems={cartItems}
                setCartItems={handleCartChange}
                calculateAndSaveTotalPrice={calculateAndSaveTotalPrice}
            />
            <CartSummary cartItems={cartItems} />
            <ActionSection>
                <Button to="/shop">계속 쇼핑하기</Button>
                <Button to="/checkout">제품 결제하기</Button>
            </ActionSection>
        </CartContainer>
    );
};

export default CartPage;
