import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orders: [],
    selectedOrder: null,
    loading: false,
    error: null,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
        selectOrder: (state, action) => {
            state.selectedOrder = action.payload;
        },
        // 다른 필요한 리듀서 추가
    },
});

export const { setOrders, selectOrder } = orderSlice.actions;
export default orderSlice.reducer;
