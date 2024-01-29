import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    fetchProduct,
    fetchProducts,
    fetchSearchSuggestions,
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

interface SearchSuggestion {
    categories: string[];
    tags: string[];
    events: string[];
}

interface ProductState {
    products: Product[];
    selectedProduct: Product | null;
    searchSuggestions: SearchSuggestion;
    loading: boolean;
    error: string | null;
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
                (state, action: PayloadAction<Product[]>) => {
                    state.loading = false;
                    state.products = action.payload;
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
            });
    },
});

export default productSlice.reducer;
