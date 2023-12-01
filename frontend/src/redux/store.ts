import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './slices/uiSlice';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer,
  },
});

// Typescript 타입 정의.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
