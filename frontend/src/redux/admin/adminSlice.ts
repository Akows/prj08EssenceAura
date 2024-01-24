import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    ApiResponse,
    Product,
} from './adminThunks';

interface AdminState {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: AdminState = {
    products: [],
    loading: false,
    error: null,
};

// builder 개념: builder는 extraReducers 필드에서 리듀서 로직을 구성하는 함수.
// 이 함수는 addCase와 같은 메서드를 통해 특정 액션에 대한 리듀서 로직을 추가할 수 있다.
// builder 패턴을 사용하면, 각 액션 타입에 대한 리듀서 로직을 보다 선언적이고 구조화된 방식으로 추가할 수 있다.

// addCase 메서드: addCase는 builder 객체의 메서드로,
// 특정 액션 타입과 해당 액션에 대한 리듀서 함수를 연결한다.
// 첫 번째 인자는 액션 타입을,
// 두 번째 인자는 이 액션에 대응하는 리듀서 함수를 받는다.
// 이 방식을 사용하면, 각각의 액션 타입에 대해 별도의 리듀서 로직을 쉽게 정의하고 관리할 수 있다.

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        // 필요한 경우 추가적인 동기 리듀서 정의
    },
    extraReducers: (builder) => {
        builder
            // 상품 목록 가져오기: pending 상태
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // 상품 목록 가져오기: fulfilled 상태
            .addCase(
                fetchProducts.fulfilled,
                (state, action: PayloadAction<ApiResponse<Product[]>>) => {
                    state.loading = false;
                    state.products = action.payload.data;
                }
            )
            // 상품 목록 가져오기: rejected 상태
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message ||
                    '상품 목록 가져오기 작업 중 예기치 못한 에러가 발생하였습니다.';
            })
            // 상품 추가: pending 상태
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // 상품 추가: fulfilled 상태
            .addCase(
                addProduct.fulfilled,
                (state, action: PayloadAction<ApiResponse<Product>>) => {
                    state.loading = false;
                    state.products.push(action.payload.data);
                }
            )
            // 상품 추가: rejected 상태
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message ||
                    '상품 추가 작업 중 예기치 못한 에러가 발생하였습니다.';
            })
            // 상품 수정: pending 상태
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // 상품 수정: fulfilled 상태
            .addCase(
                updateProduct.fulfilled,
                (state, action: PayloadAction<ApiResponse<Product>>) => {
                    state.loading = false;
                    const index = state.products.findIndex(
                        (p) => p.product_id === action.payload.data.product_id
                    );
                    if (index !== -1) {
                        state.products[index] = action.payload.data;
                    }
                }
            )
            // 상품 수정: rejected 상태
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message ||
                    '상품 수정 작업 중 예기치 못한 에러가 발생하였습니다.';
            })
            // 상품 삭제: pending 상태
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // 상품 삭제: fulfilled 상태
            .addCase(
                deleteProduct.fulfilled,
                (state, action: PayloadAction<ApiResponse<Product>>) => {
                    state.loading = false;
                    // 확인: action.payload가 올바른 형태로 product_id를 포함하고 있는지.
                    // action.payload.data.product_id가 문자열이므로, 숫자 타입의 product_id와 비교하기 위해 변환
                    state.products = state.products.filter(
                        (product) =>
                            product.product_id &&
                            product.product_id.toString() !==
                                action.payload.product_id
                    );
                }
            )
            // 상품 삭제: rejected 상태
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message ||
                    '상품 삭제 작업 중 예기치 못한 에러가 발생하였습니다.';
            });
    },
});

export default adminSlice.reducer;
