// module.exports = {
//   root: true,
//   env: { browser: true, es2020: true },
//   extends: [
//     "../.eslintrc.js", // 프로젝트 루트의 ESLint 설정 상속
//     'eslint:recommended',
//     'plugin:@typescript-eslint/recommended',
//     'plugin:react-hooks/recommended',
//   ],
//   ignorePatterns: ['dist', '.eslintrc.cjs'],
//   parser: '@typescript-eslint/parser',
//   plugins: ['react-refresh'],
//   rules: {
//     'react-refresh/only-export-components': [
//       'warn',
//       { allowConstantExport: true },
//     ],
//   },
// }

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "../.eslintrc.js", // 프로젝트 루트의 ESLint 설정 상속
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    // 상속된 루트 규칙을 기반으로 추가적인 프론트엔드 특화 규칙 적용
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    // 들여쓰기 규칙을 명시적으로 설정하여 루트 설정과의 충돌 방지
    // 루트 설정과 일치하도록 조정
    'indent': ['error', 4, { 'SwitchCase': 1 }], // 루트 설정에서 사용된 동일한 들여쓰기 규칙 적용
    'react/jsx-indent': ['error', 4], // JSX 들여쓰기 4칸
    'react/jsx-indent-props': ['error', 4], // JSX 속성 들여쓰기 4칸

    // 기타 프론트엔드 특화 규칙을 추가할 수 있음
    // 예: 'react/jsx-uses-react': 'off', 'react/react-in-jsx-scope': 'off' 등
  },
}
