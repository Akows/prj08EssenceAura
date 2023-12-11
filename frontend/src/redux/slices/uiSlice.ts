import { createSlice } from '@reduxjs/toolkit';

// 인터페이스 정의: UI의 상태를 나타내는 타입.
interface UIState {
  theme: 'light' | 'dark';
  language: 'ko' | 'en';
}

// 타입 추출: UIState에서 테마와 언어의 타입을 추출.
type ThemeType = UIState['theme'];
type LanguageType = UIState['language'];

// localStorage에서 초기 상태를 로드하는 함수.
const loadState = () => {
  // localStorage에서 테마 값 가져오기. 값이 없을 경우 null을 반환.
  const savedTheme = localStorage.getItem('theme');
  // 가져온 테마 값이 유효한지 확인하고, 그렇지 않으면 'light'를 기본값으로 설정.
  const theme: ThemeType = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'light';

  // localStorage에서 언어 값 가져오기. 값이 없을 경우 null을 반환.
  const savedLanguage = localStorage.getItem('language');
  // 가져온 언어 값이 유효한지 확인하고, 그렇지 않으면 'ko'를 기본값으로 설정.
  const language: LanguageType = savedLanguage === 'ko' || savedLanguage === 'en' ? savedLanguage : 'ko';

  // 로드된 상태를 반환.
  return {
    theme,
    language,
  };
};

// 초기 상태를 함수 호출을 통해 설정.
const initialState: UIState = loadState();

// uiSlice를 생성. 이는 Redux Toolkit의 createSlice 함수를 사용.
export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // 테마를 토글하는 리듀서.
    toggleTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme); // localStorage에도 저장.
      state.theme = newTheme;
    },
    // 언어를 설정하는 리듀서.
    toggleLanguage: (state) => {
      const nextLanguage = state.language === 'ko' ? 'en' : 'ko' ;
      state.language = nextLanguage;
      localStorage.setItem('language', nextLanguage);
    },
  },
});

// uiSlice에서 액션 생성 함수를 내보낸다.
export const { toggleTheme, toggleLanguage } = uiSlice.actions;

// uiSlice의 리듀서를 기본 내보내기로 설정.
export default uiSlice.reducer;
