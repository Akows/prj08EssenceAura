// Redux Toolkit을 사용하여 스토어를 구성하기 위한 configureStore 함수를 가져온다.
import { configureStore } from '@reduxjs/toolkit';

import uiReducer from './slices/uiSlice';
import authReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';
import orderReducer from './slices/orderSlice'; // 주문 관련 상태 관리를 위한 리듀서.
import reviewReducer from './slices/reviewSlice'; // 리뷰 관련 상태 관리를 위한 리듀서.

// 스토어를 구성합니다. 이 스토어는 애플리케이션의 전체 상태를 관리.
export const store = configureStore({
    reducer: {
        ui: uiReducer, // ui 슬라이스의 리듀서를 스토어에 연결.
        auth: authReducer, // auth 슬라이스의 리듀서를 스토어에 연결.
        cart: cartReducer, // cart 슬라이스의 리듀서를 스토어에 연결.
        products: productsReducer, // products 슬라이스의 리듀서를 스토어에 연결.
        order: orderReducer, // order 슬라이스의 리듀서를 스토어에 연결.
        review: reviewReducer, // review 슬라이스의 리듀서를 스토어에 연결.
        // 추가된 슬라이스의 리듀서를 여기에 연결합니다.
    },
});

// Typescript 타입 정의.
// RootState와 AppDispatch 타입은 컴포넌트 및 다른 부분에서 Redux 상태와 dispatch 함수를 사용할 때 TypeScript의 타입 안전성을 제공합니다.

// RootState 타입은 스토어의 전체 상태의 타입을 나타냅니다.
// store.getState를 사용하여 Redux 스토어의 전체 상태를 가져오고, typeof 연산자를 통해 해당 함수의 반환 타입을 추출하여 TypeScript의 제네릭 문법을 사용합니다.
// ReturnType : 주어진 함수 타입의 반환 값 타입을 추출하는 데 사용되는 유틸리티 타입.
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch 타입은 Redux 스토어의 dispatch 함수의 타입을 나타냅니다.
export type AppDispatch = typeof store.dispatch;
