import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

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
            const response = await axios.get(
                `${
                    import.meta.env.VITE_API_URL
                }/product/fetchProduct/${productId}`
            );
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
    `product/fetchProducts`,
    async (params: ProductParams, { rejectWithValue }) => {
        try {
            // API로부터 조건에 맞는 제품 목록을 조회
            // 이때, 이름, 카테고리, 태그, 이벤트, 정렬 기준, 페이지네이션 등의 파라미터 사용
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/product/fetchProducts`,
                {
                    params,
                }
            );
            return response.data;
        } catch (error) {
            // 오류 발생 시 처리
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data);
        }
    }
);

export const fetchMainPageProducts = createAsyncThunk(
    'product/fetchMainPageProducts',
    async (params: ProductParams, { rejectWithValue }) => {
        try {
            // API로부터 조건에 맞는 제품 목록을 조회
            // 이때, 이름, 카테고리, 태그, 이벤트, 정렬 기준, 페이지네이션 등의 파라미터 사용
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/product/fetchProducts`,
                {
                    params,
                }
            );
            return response.data;
        } catch (error) {
            // 오류 발생 시 처리
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data);
        }
    }
);

// 검색 제안을 가져오는 비동기 thunk
export const fetchSearchSuggestions = createAsyncThunk(
    'product/suggestions',
    async (keyword: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${
                    import.meta.env.VITE_API_URL
                }/product/suggestions?keyword=${keyword}`
            );

            // API로부터 받은 데이터를 가공합니다.
            const { data } = response;
            const combinedSuggestions = [];

            console.log(data);

            // 각 유형의 제안을 하나의 배열로 결합합니다.
            data.categories
                ?.filter(Boolean)
                .forEach((item) =>
                    combinedSuggestions.push({ type: 'category', value: item })
                );
            data.events
                ?.filter(Boolean)
                .forEach((item) =>
                    combinedSuggestions.push({ type: 'event', value: item })
                );
            data.name
                ?.filter(Boolean)
                .forEach((item) =>
                    combinedSuggestions.push({ type: 'name', value: item })
                );
            data.tags
                ?.filter(Boolean)
                .forEach((item) =>
                    combinedSuggestions.push({ type: 'tag', value: item })
                );

            return combinedSuggestions;
        } catch (error) {
            // 오류 발생 시 처리
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data);
        }
    }
);

// 카테고리별 최대 판매량 상품 조회 Thunk
export const fetchTopSellingProductsByCategory = createAsyncThunk(
    'product/fetchTopSellingProductsByCategory',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/product/topSellingByCategory`
            );
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data);
        }
    }
);
