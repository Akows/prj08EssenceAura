module.exports = {
    parser: '@typescript-eslint/parser', // TypeScript 파싱을 위한 파서 설정
    extends: [
      'plugin:@typescript-eslint/recommended', // TypeScript 규칙 사용
      'plugin:react/recommended', // React 규칙 사용
      'plugin:react-hooks/recommended', // React Hooks 규칙 사용
      'plugin:prettier/recommended', // Prettier 규칙 사용
      'eslint-config-prettier', // eslint-config-prettier를 여기에 추가
    ],
    settings: {
      react: {
        version: 'detect', // React 버전 자동 감지
      },
    },
    rules: {
        // JavaScript 규칙
        'eqeqeq': 'error', // '==' 대신 '===' 사용 강제
        'no-unused-vars': ['warn', { 'vars': 'all', 'args': 'after-used' }], // 사용하지 않는 변수에 대해 경고
        'no-console': 'error', // 콘솔 사용 금지
        'curly': 'error', // 모든 제어문에 중괄호 사용

         // 들여쓰기 규칙
        'indent': ['error', 4], // 일반 JavaScript 들여쓰기 (4칸)
        'react/jsx-indent': ['error', 4], // JSX 들여쓰기 (4칸)
        'react/jsx-indent-props': ['error', 4], // JSX 속성 들여쓰기 (4칸)

        // React 규칙
        'react/prop-types': 'off', // React prop-types 규칙 비활성화 (TypeScript 사용 시)
        'react/react-in-jsx-scope': 'off', // React 17 이상의 새 JSX 변환 사용 시
    
        // TypeScript 규칙 (@typescript-eslint 플러그인 필요)
        '@typescript-eslint/no-unused-vars': ['warn', { 'vars': 'all', 'args': 'none' }], // TypeScript 환경에서 사용하지 않는 변수 금지
        '@typescript-eslint/explicit-function-return-type': 'off', // 함수 반환 타입 명시적 선언 비활성화
        '@typescript-eslint/no-explicit-any': 'warn', // 'any' 타입 사용에 대해 경고
      },
      // 들여쓰기 규칙 설정.
      // 기본 들여쓰기 레벨은 4, 다만 SwitchCase의 경우 추가로 4 * 1만큼의 추가 들여쓰기 적용.
      // 'indent': ['error', 4, { 'SwitchCase': 1 }],
  };
  