import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

export type Product = {
    product_id?: number; // 상품 ID
    name: string; // 상품 이름
    description: string; // 상품 설명
    price: number; // 가격
    category: string; // 카테고리
    tags: string | null; // 태그 (null 허용)
    stock: number; // 재고 수량
    image_url: string; // 이미지 URL
    created_at: string; // 생성된 날짜 및 시간
    what_event: string; // 어떤 이벤트에 속하는지
    discount_rate: number | null; // 할인율 (null 허용)
};

export type ApiResponse<T> = {
    data: T;
    message: string;
    product_id?: string;
};

// createAsyncThunk의 제네릭 파라미터:
// 첫 번째 파라미터는 성공 시 반환되는 데이터의 타입,
// 두 번째 파라미터는 thunk 함수에 전달되는 인자의 타입을 나타낸다.

// 각 비동기 함수의 첫 번째 파라미터는 서버로 전송되는 데이터(또는 상품 ID),
// 두 번째 파라미터는 thunk API의 일부로, 여기서는 주로 오류 처리에 사용되는 rejectWithValue 함수를 포함.

//
//
//
//
//

// 상품 정보 가져오기

// 이 함수는 상품 목록을 서버에서 가져온다.
// 서버에 GET 요청을 보내고,
// 성공적으로 데이터를 받으면 이를 반환.
// 오류가 발생하면 오류 정보를 반환.

// 비동기 함수의 첫 번째 인자 _?
// '_' 기호는 TypeScript에서 "이 인자는 사용되지 않는다"는 것을 나타내는 관례적인 방법.
export const fetchProducts = createAsyncThunk<ApiResponse<Product[]>>(
    'admin/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            // API에서 상품 목록을 GET 요청으로 가져온다.
            const response = await axios.get<ApiResponse<Product[]>>(
                `${import.meta.env.VITE_API_URL}/admin/fetchProducts`
            );
            // 요청이 성공하면 응답 데이터를 반환한다.
            return response.data;
        } catch (error) {
            // 요청 중 발생한 오류를 처리한다.
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data);
        }
    }
);

// 상품 추가

// 새로운 상품 데이터를 서버에 추가.
// 서버에 POST 요청을 보내고,
// 성공적으로 처리되면 추가된 상품 정보를 반환.
// 오류가 발생하면 오류 정보를 반환.
export const addProduct = createAsyncThunk<ApiResponse<Product>, Product>(
    'admin/addProduct',
    async (productData, { rejectWithValue }) => {
        try {
            // API에 새 상품 데이터를 POST 요청으로 전송.
            const response = await axios.post<ApiResponse<Product>>(
                `${import.meta.env.VITE_API_URL}/admin/addProduct`,
                productData
            );
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data);
        }
    }
);

// 상품 수정

// 기존 상품의 정보를 수정.
// 각 상품의 고유 ID를 사용하여 서버에 PUT 요청을 보내고,
// 성공적으로 처리되면 수정된 상품 정보를 반환.
// 오류가 발생하면 오류 정보를 반환.
export const updateProduct = createAsyncThunk<
    ApiResponse<Product>,
    { id: number; productData: Product }
>('admin/updateProduct', async ({ id, productData }, { rejectWithValue }) => {
    try {
        // API에 상품 ID를 사용하여 해당 상품을 PUT 요청으로 수정.
        const response = await axios.put<ApiResponse<Product>>(
            `${import.meta.env.VITE_API_URL}/admin/updateProduct/${id}`,
            productData
        );
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        return rejectWithValue(axiosError.response?.data);
    }
});

// 상품 삭제

// 상품을 삭제.
// 상품의 ID를 사용하여 서버에 DELETE 요청을 보내고,
// 성공적으로 처리되면 삭제된 상품의 정보를 반환.
// 오류가 발생하면 오류 정보를 반환.
export const deleteProduct = createAsyncThunk<ApiResponse<Product>, number>(
    'admin/deleteProduct',
    async (id, { rejectWithValue }) => {
        try {
            // API에 상품 ID를 사용하여 해당 상품을 DELETE 요청으로 삭제.
            const response = await axios.delete<ApiResponse<Product>>(
                `${import.meta.env.VITE_API_URL}/admin/deleteProduct/${id}`
            );
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data);
        }
    }
);
