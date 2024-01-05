import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userInfo: null,
    isLoggedIn: false,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.userInfo = action.payload;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.userInfo = null;
            state.isLoggedIn = false;
        },
        // 다른 필요한 리듀서 추가
    },
    // 비동기 액션 처리 (예: createAsyncThunk 사용)
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
