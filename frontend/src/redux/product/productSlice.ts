import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProduct, fetchProducts } from './productThunks';

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

interface ProductState {
    products: Product[];
    selectedProduct: Product | null;
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    selectedProduct: null,
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
                state.error = action.error.message || 'Failed to fetch product';
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
                    action.error.message || 'Failed to fetch products';
            });
    },
});

export default productSlice.reducer;
