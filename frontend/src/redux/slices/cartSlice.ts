import { createSlice } from '@reduxjs/toolkit';

interface CartItem {
    productId: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                (item) => item.productId !== action.payload.productId
            );
        },
        updateQuantity: (state, action) => {
            const item = state.items.find(
                (item) => item.productId === action.payload.productId
            );
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
