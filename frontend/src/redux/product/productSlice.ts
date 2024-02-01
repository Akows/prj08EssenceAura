import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    fetchProduct,
    fetchProducts,
    fetchSearchSuggestions,
    fetchTopSellingProductsByCategory,
} from './productThunks';

interface Product {
    productId: number;
    name: string;
    description: string;
    price: number;
    category: string;
    tags: string;
    stock: number;
    imageUrl: string;
    createdAt: string;
    whatEvent: string;
    discountRate: number | null;
}

interface TopSellingProduct {
    product_id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    tags: string;
    stock: number;
    image_url: string;
    created_at: string;
    what_event: string;
    discount_rate: number | null;
}

interface SearchSuggestion {
    name: string[];
    categories: string[];
    tags: string[];
    events: string[];
}

interface ProductState {
    topSellingProductsByCategory: TopSellingProduct[];
    products: Product[];
    selectedProduct: Product | null;
    searchSuggestions: SearchSuggestion;
    loading: boolean;
    error: string | null;
}

interface ProductsResponse {
    topSellingProductsByCategory: [];
    totalProducts: number;
    products: Product[];
    page: number;
    totalPages: number;
}

const initialState: ProductState = {
    products: [],
    selectedProduct: null,
    searchSuggestions: { categories: [], tags: [], events: [] },
    loading: false,
    error: null,
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                fetchProduct.fulfilled,
                (state, action: PayloadAction<Product>) => {
                    state.loading = false;
                    state.selectedProduct = action.payload;
                }
            )
            .addCase(fetchProduct.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message ||
                    '제품 데이터를 불러오는 과정에서 오류가 발생하였습니다.';
            })
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                fetchProducts.fulfilled,
                (state, action: PayloadAction<ProductsResponse>) => {
                    state.loading = false;
                    state.products = action.payload.products[0]; // 여기서 상품 목록을 업데이트
                    state.totalPages = action.payload.totalPages; // 전체 페이지 수를 업데이트
                    state.currentPage = action.payload.page; // 현재 페이지를 업데이트
                }
            )
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message ||
                    '제품 데이터를 불러오는 과정에서 오류가 발생하였습니다.';
            })
            .addCase(fetchSearchSuggestions.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                fetchSearchSuggestions.fulfilled,
                (state, action: PayloadAction<SearchSuggestion>) => {
                    state.loading = false;
                    state.searchSuggestions = action.payload;
                }
            )
            .addCase(fetchSearchSuggestions.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message ||
                    '제품 추천 데이터를 불러오는 과정에서 오류가 발생하였습니다.';
            })
            .addCase(fetchTopSellingProductsByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchTopSellingProductsByCategory.fulfilled,
                (state, action: PayloadAction<TopSellingProduct[]>) => {
                    state.topSellingProductsByCategory = action.payload;
                    state.loading = false;
                }
            )
            .addCase(
                fetchTopSellingProductsByCategory.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error =
                        action.error.message ||
                        '최고 판매량 데이터를 불러오는 과정에서 오류가 발생하였습니다.';
                }
            );
    },
});

export default productSlice.reducer;
