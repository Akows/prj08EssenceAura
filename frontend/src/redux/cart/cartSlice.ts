import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 장바구니 아이템 타입 정의
interface CartItem {
    productId: number;
    name: string;
    quantity: number;
    price: number;
}

// 장바구니 상태 타입 정의
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
        addItem: (state, action: PayloadAction<CartItem>) => {
            const existingIndex = state.items.findIndex(
                (item) => item.productId === action.payload.productId
            );

            if (existingIndex >= 0) {
                state.items[existingIndex].quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        updateItem: (
            state,
            action: PayloadAction<{ productId: number; quantity: number }>
        ) => {
            const index = state.items.findIndex(
                (item) => item.productId === action.payload.productId
            );

            if (index >= 0) {
                state.items[index].quantity = action.payload.quantity;
            }
        },
        removeItem: (state, action: PayloadAction<{ productId: number }>) => {
            state.items = state.items.filter(
                (item) => item.productId !== action.payload.productId
            );
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addItem, updateItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
