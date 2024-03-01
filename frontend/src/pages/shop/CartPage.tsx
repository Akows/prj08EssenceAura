import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import CartItemList from '../../components/shop/CartItemList';
import CartSummary from '../../components/shop/CartSummary';
import { useSelector } from 'react-redux';

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

const Button = styled.button`
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
    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);

    const { isLoggedIn, userInfo } = useSelector((state) => ({
        ...state.auth,
    }));

    // 총 가격 계산 및 로컬 스토리지에 저장
    const calculateAndSaveTotalPrice = (cartItems) => {
        const totalPrice = cartItems.reduce((total, item) => {
            return total + parseFloat(item.final_price) * item.quantity;
        }, 0);

        localStorage.setItem(
            `totalPrice-${userInfo.user_id}`,
            JSON.stringify(totalPrice)
        );

        return totalPrice;
    };

    // 장바구니가 변경되었을 때 호출됩니다.
    const handleCartChange = (updatedCartItems) => {
        setCartItems(updatedCartItems);
        calculateAndSaveTotalPrice(updatedCartItems);
    };

    const handleToShop = () => {
        navigate('/shop');
    };

    const handleCheckOrder = () => {
        if (cartItems.length === 0) {
            alert('구매할 제품이 존재하지않습니다.');
            return;
        }

        if (window.confirm('제품을 구매하시겠습니까?')) {
            if (!isLoggedIn) {
                alert('로그인한 사용자만 구매가 가능합니다.');
                navigate('/login');
                return;
            }
            navigate('/checkout');
        } else {
            return;
        }
    };

    useEffect(() => {
        const savedCartItems = JSON.parse(
            localStorage.getItem(`cart-${userInfo.user_id}`) || '[]'
        );
        setCartItems(savedCartItems);
        calculateAndSaveTotalPrice(savedCartItems);
    }, [userInfo]);

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
                <Button onClick={handleToShop}>계속 쇼핑하기</Button>
                <Button onClick={handleCheckOrder}>제품 결제하기</Button>
            </ActionSection>
        </CartContainer>
    );
};

export default CartPage;
