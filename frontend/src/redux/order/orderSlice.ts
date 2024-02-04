import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    OrderResponse,
    OrderState,
    PaymentResponse,
} from '../../type/orderTypes';

import { createOrder, processPayment } from './orderThunk';

const initialState: OrderState = {
    currentOrder: null,
    paymentResult: null,
    loading: false,
    error: null,
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                createOrder.fulfilled,
                (state, action: PayloadAction<OrderResponse>) => {
                    state.loading = false;
                    state.currentOrder = action.payload;
                }
            )
            .addCase(
                createOrder.rejected,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )
            .addCase(processPayment.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                processPayment.fulfilled,
                (state, action: PayloadAction<PaymentResponse>) => {
                    state.loading = false;
                    state.paymentResult = action.payload;
                }
            )
            .addCase(
                processPayment.rejected,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            );
    },
});

export default orderSlice.reducer;
