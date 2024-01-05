import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // 장바구니에 항목 추가 로직
        },
        removeFromCart: (state, action) => {
            // 장바구니에서 항목 제거 로직
        },
        // 다른 필요한 리듀서 추가
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
