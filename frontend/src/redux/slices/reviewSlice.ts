import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    reviews: [],
    loading: false,
    error: null,
};

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setReviews: (state, action) => {
            state.reviews = action.payload;
        },
        // 다른 필요한 리듀서 추가
    },
});

export const { setReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
