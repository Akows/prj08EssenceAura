import { createSlice } from '@reduxjs/toolkit';

interface UserInfo {
    id: string;
    email: string;
    username: string;
    isAdmin: boolean; // 이제 필수 속성으로 추가
}

interface AuthState {
    userInfo: UserInfo | null;
    isLoggedIn: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    userInfo: null,
    isLoggedIn: false,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
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
