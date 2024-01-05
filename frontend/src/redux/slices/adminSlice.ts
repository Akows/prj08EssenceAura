import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    error: null,
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        // 관리자 관련 리듀서
        setad: (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { setad } = adminSlice.actions;
export default adminSlice.reducer;
