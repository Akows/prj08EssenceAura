// productThunks.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

// API의 기본 URL 설정
const API_BASE_URL = 'http://localhost:3001/product';

// 제품 조회에 사용될 파라미터 인터페이스 정의
interface ProductParams {
    productId?: number;
    name?: string;
    category?: string;
    tags?: string;
    whatEvent?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}

// 단일 제품을 조회하는 비동기 thunk
export const fetchProduct = createAsyncThunk(
    'product/fetchProduct',
    async (productId: number, { rejectWithValue }) => {
        try {
            // API로부터 단일 제품 정보를 조회
            const response = await axios.get(`${API_BASE_URL}/${productId}`);
            return response.data;
        } catch (error) {
            // 오류 발생 시 처리
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data);
        }
    }
);

// 복수 제품을 조회하는 비동기 thunk
export const fetchProducts = createAsyncThunk(
    'product/fetchProducts',
    async (params: ProductParams, { rejectWithValue }) => {
        try {
            // API로부터 조건에 맞는 제품 목록을 조회
            // 이때, 이름, 카테고리, 태그, 이벤트, 정렬 기준, 페이지네이션 등의 파라미터 사용
            const response = await axios.get(`${API_BASE_URL}`, { params });
            return response.data;
        } catch (error) {
            // 오류 발생 시 처리
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data);
        }
    }
);
