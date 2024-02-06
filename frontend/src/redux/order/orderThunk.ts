import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {
    Order,
    OrderResponse,
    Payment,
    PaymentResponse,
} from '../../type/orderTypes';

export const createOrder = createAsyncThunk<
    OrderResponse,
    Order,
    { rejectValue: string }
>('order/createOrder', async (orderData, { rejectWithValue }) => {
    try {
        const response = await axios.post<OrderResponse>(
            `${import.meta.env.VITE_API_URL}/order/createOrder`,
            orderData
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        return rejectWithValue(
            axiosError.response?.data.message || 'Unknown error'
        );
    }
});

export const processPayment = createAsyncThunk<
    PaymentResponse,
    Payment,
    { rejectValue: string }
>('order/processPayment', async (paymentData, { rejectWithValue }) => {
    try {
        const response = await axios.post<PaymentResponse>(
            `${import.meta.env.VITE_API_URL}/order/processPayment`,
            paymentData
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        return rejectWithValue(
            axiosError.response?.data.message || 'Unknown error'
        );
    }
});
