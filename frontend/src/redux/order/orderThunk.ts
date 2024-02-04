import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import {
    Order,
    OrderResponse,
    Payment,
    PaymentResponse,
} from '../../type/orderTypes';

// API의 기본 URL 설정
const API_BASE_URL = 'http://localhost:3001/order';

export const createOrder = createAsyncThunk<
    OrderResponse,
    Order,
    { rejectValue: string }
>('order/createOrder', async (orderData, { rejectWithValue }) => {
    try {
        const response = await axios.post<OrderResponse>(
            `${API_BASE_URL}/createOrder`,
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
            `${API_BASE_URL}/processPayment`,
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
