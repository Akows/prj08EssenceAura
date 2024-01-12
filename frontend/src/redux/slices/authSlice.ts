import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: null,
        isLoggedIn: false,
        loading: false,
        error: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.userInfo = action.payload;
            state.isLoggedIn = true;
        },
        loginFailure: (state, action) => {
            state.userInfo = null;
            state.isLoggedIn = false;
            state.error = action.payload; // 오류 메시지를 payload에서 받아 저장
        },
        logout: (state) => {
            state.userInfo = null;
            state.isLoggedIn = false;
        },
        // ... 기타 리듀서
    },
    // ... 기타 로직
});
export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
