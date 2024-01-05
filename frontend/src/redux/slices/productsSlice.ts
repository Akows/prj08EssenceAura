import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        selectProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        // 다른 필요한 리듀서 추가
    },
});

export const { setProducts, selectProduct } = productSlice.actions;
export default productSlice.reducer;
