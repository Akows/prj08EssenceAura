import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  theme: 'light' | 'dark';
  language: 'ko' | 'en';
}

const initialState: UIState = {
  theme: 'light',
  language: 'ko',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<'ko' | 'en'>) => {
      state.language = action.payload;
    },
  },
});

// uiSlice에서 액션 생성 함수를 내보낸다.
export const { setTheme, setLanguage } = uiSlice.actions;
// uiSlice의 리듀서를 기본 내보내기로 설정.
export default uiSlice.reducer;

// set 액션의 장점:
// 명시적인 상태 설정: 애플리케이션을 초기화하거나, 사용자의 설정을 복원할 때 특정 값으로 상태를 직접 설정 가능.
// 예측 가능성: 주어진 값에 따라 상태가 설정되므로, 상태의 최종 결과가 더 예측 가능.

// toggle 액션의 장점:
// 사용자 인터랙션에 대응: 사용자가 UI 요소를 클릭하여 설정을 전환하는 경우와 같은 상황에 적합.
// 코드 간결성: 현재 상태를 기반으로 반대 상태로 쉽게 전환할 수 있어, 간결한 코드 작성이 가능.

// 예시:
// setTheme와 setLanguage는 앱의 초기 로드 시나 사용자가 설정 화면에서 특정 테마나 언어를 선택했을 때 사용.
// toggleTheme와 toggleLanguage는 사용자가 테마 전환 버튼을 클릭하거나 간단한 언어 전환을 수행할 때 유용.