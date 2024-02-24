import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CartItem from './CartItem';

const ItemListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px; // 아이템 간 간격
    padding: 10px; // 패딩
`;

interface CartItemProps {
    product_id: number;
    imageUrl: string;
    title: string;
    price: number;
    quantity: number;
}

interface CartItemListProps {
    cartItems: CartItemProps[];
    setCartItems: React.Dispatch<React.SetStateAction<CartItemProps[]>>;
}

const CartItemList: React.FC<CartItemListProps> = ({
    cartItems,
    setCartItems,
    calculateAndSaveTotalPrice,
}) => {
    const { userInfo } = useSelector((state) => ({
        ...state.auth,
    }));

    const handleQuantityChange = (product_id: number, quantity: number) => {
        const newCartItems = cartItems.map((item) =>
            item.product_id === product_id
                ? { ...item, quantity: Math.max(quantity, 0) }
                : item
        );
        setCartItems(newCartItems);
        localStorage.setItem(
            `cart-${userInfo.user_id}`,
            JSON.stringify(newCartItems)
        );
        calculateAndSaveTotalPrice(newCartItems); // 총 가격 다시 계산 및 저장
    };

    const handleRemoveItem = (product_id: number) => {
        if (window.confirm('장바구니에서 제품을 삭제하시겠습니까?')) {
            const newCartItems = cartItems.filter(
                (item) => item.product_id !== product_id
            );
            setCartItems(newCartItems);
            localStorage.setItem(
                `cart-${userInfo.user_id}`,
                JSON.stringify(newCartItems)
            );
            calculateAndSaveTotalPrice(newCartItems); // 총 가격 다시 계산 및 저장
        }
    };

    return (
        <ItemListContainer>
            {cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <CartItem
                        key={item.product_id}
                        item={item}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemoveItem}
                    />
                ))
            ) : (
                <div>장바구니에 제품이 존재하지 않습니다.</div>
            )}
        </ItemListContainer>
    );
};

export default CartItemList;
