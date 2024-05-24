# 'EssenceAura (에센스오라)'

## 💪🏻프로젝트 개괄

 - '가상의 향수 쇼핑몰'을 주제로 하는 풀스택 역량 향상 프로젝트

## ✔️ 프로젝트 상세 설명

- `velog` [🔗velog 포스트 시리즈](https://velog.io/@skyoffly/series/EssenceAura-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8)

## ✔️ 프로젝트 시연

- `AWS` [🔗프로젝트 배포](http://essenceaura-production.s3-website.ap-northeast-2.amazonaws.com/)

### 🛫 시작 가이드

- 실행 방법 (2가지 중 택 1)
  > 1. 배포 링크를 통한 프로젝트 직접 실행
  > 2. ZIP 파일 다운로드 및 압축 풀기 후 코드 에디터로 실행

```
$ npm i
$ npm run start
```

## 🛠️ 사용기술
![Typescript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React.js](https://img.shields.io/badge/-React.js-61DAFB?style=flat-square&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/-Express.js-000000?style=flat-square&logo=express&logoColor=white)
![Redux](https://img.shields.io/badge/-Redux-764ABC?style=flat-square&logo=redux&logoColor=white)
![React-Redux](https://img.shields.io/badge/-React--Redux-764ABC?style=flat-square&logo=react-redux&logoColor=white)
![Redux-Toolkit](https://img.shields.io/badge/-Redux--Toolkit-764ABC?style=flat-square&logo=redux-toolkit&logoColor=white)
![Styled Components](https://img.shields.io/badge/-Styled_Components-DB7093?style=flat-square&logo=styled-components&logoColor=white)
![MySQL](https://img.shields.io/badge/-MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![AWS S3](https://img.shields.io/badge/-AWS_S3-569A31?style=flat-square&logo=amazon-s3&logoColor=white)
![AWS EC2](https://img.shields.io/badge/-AWS_EC2-232F3E?style=flat-square&logo=amazon-ec2&logoColor=white)
![AWS RDS](https://img.shields.io/badge/-AWS_RDS-527FFF?style=flat-square&logo=amazon-rds&logoColor=white)

## 프로젝트 소개

Essence Aura'는 가상의 온라인 향수 쇼핑몰입니다. 프로젝트의 운영 및 배포를 AWS를 통해 구축하였으며, 안정적인 사용자 경험을 제공하고 백엔드 효율성을 극대화하기 위해 MySQL과 Express.js를 사용하여 복잡한 데이터베이스 관리와 로직 처리를 수행했습니다.

회원가입부터 결제까지 다양한 기능을 구현하여 사용자와 관리자 모두 만족스러운 사용자 경험을 얻을 수 있게 하였으며, JWT를 활용한 인증 시스템과 Redux로 상태 관리를 최적화하여, 각 사용자의 편의성을 개선하고 관리자의 효율을 증대시켰습니다.

반응형 웹 디자인을 중심으로 CSS Media Queries와 애니메이션을 활용하여 다양한 디바이스에서의 일관된 사용자 경험을 제공하며, Styled Components를 통한 세련된 스타일 관리를 도입하였습니다.

페이지네이션과 무한 스크롤 기능을 통해 UI 로딩 시간을 최적화하고, 유효성 검사 및 안전한 쿼리 기법으로 보안을 강화하여 사용자 데이터 보호 및 서비스 신뢰성을 제고하였습니다.

## 구현 기능

### - 사용자 관련 기능:
- 회원가입: 사용자 이름, 이메일, 비밀번호, 주소 등 필요한 정보를 입력받아 회원가입을 처리합니다.
- 로그인 및 로그아웃: 사용자 인증을 위한 로그인 및 로그아웃 기능을 제공합니다.
- 비밀번호 초기화: 비밀번호 재설정을 위한 이메일 인증 및 비밀번호 변경 기능을 제공합니다.
- 사용자 정보 조회 및 수정: 사용자의 개인 정보를 조회하고 수정할 수 있는 기능을 제공합니다.
- 사용자 주문 내역 조회: 사용자의 주문 내역을 조회할 수 있습니다.

### - 관리자 관련 기능:
- 사용자 및 관리자 관리: 사용자 및 관리자 정보를 조회하고 업데이트하거나 비활성화할 수 있습니다.
- 제품 관리: 제품을 추가, 수정, 삭제하고 조회할 수 있는 기능을 제공합니다.

### - 주문 및 제품 관련 기능:
- 제품 목록 및 상세 조회: 제품 목록을 조회하고, 각 제품의 상세 정보를 볼 수 있습니다. 제품 목록을 조회하는 과정에서 필터링 및 정렬 기능이 사용할 수 있습니다.
- 제품 검색 및 추천어 기능: 사용자는 제품을 검색하고, 입력한 검색 키워드에 맞는 추천 검색어를 제공받습니다.
- 장바구니 기능: 사용자가 제품을 장바구니에 추가하고 관리할 수 있습니다.
- 주문 생성 및 결제 처리: 사용자가 주문을 생성하고 결제를 처리할 수 있습니다.

### - 추가 기능 및 유틸리티:
- JWT 토큰 사용: 사용자 인증에 JWT 토큰을 사용하여 보안성을 강화합니다.
- 로그인 상태 유지: 사용자의 로그인 상태를 유지하는 방법을 구현합니다.
- 이메일 중복 검사: 회원가입 시 이메일 주소의 중복 여부를 확인합니다.
- 이메일 인증: 회원가입 또는 비밀번호 재설정 시 이메일 인증 절차를 진행합니다.
- 유효성 검사: 로그인, 회원가입, 비밀번호 재설정 등의 폼에서 입력 데이터의 유효성을 검사합니다.
- 페이지네이션: 제품 목록 또는 다른 목록을 페이징하여 표시합니다.
- 무한 스크롤: 제품 목록을 스크롤하여 출력합니다.
- 모달 및 드롭다운 메뉴: 다양한 상황에 맞는 모달 및 드롭다운 메뉴를 사용하여 사용자 인터페이스를 개선합니다.
- Debounce 기능: 키 입력과 같은 연속적인 이벤트 처리 시 불필요한 반복 호출을 방지합니다.
- HTTP Only 쿠키: 보안 문제를 해결하기 위해 HTTP Only 쿠키를 사용합니다.
- SQL 인젝션 방지: SQL 인젝션을 방지하기 위한 prepared statement 기능이 구현되었습니다.

## 🌲프로젝트 구조
### 프론트엔드
```bash
 ┣ 📂src
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📜logo.png
 ┃ ┃ ┣ 📜logo2.png
 ┃ ┃ ┣ 📜MDsrecommendationbanner.webp
 ┃ ┃ ┣ 📜react.svg
 ┃ ┃ ┣ 📜specialdiscountbanner.webp
 ┃ ┃ ┗ 📜springsalebanner.webp
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂admin
 ┃ ┃ ┃ ┣ 📜InventoryManagement.tsx
 ┃ ┃ ┃ ┣ 📜InventoryModal.tsx
 ┃ ┃ ┃ ┣ 📜UserAdminFormModal.tsx
 ┃ ┃ ┃ ┣ 📜UserAdminList.tsx
 ┃ ┃ ┃ ┣ 📜UserList.tsx
 ┃ ┃ ┃ ┗ 📜UserManagement.tsx
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📜EmailVerificationModal.tsx
 ┃ ┃ ┃ ┣ 📜FindEmailForm.tsx
 ┃ ┃ ┃ ┣ 📜LoginForm.tsx
 ┃ ┃ ┃ ┣ 📜PasswordResetModal.tsx
 ┃ ┃ ┃ ┣ 📜RegistrationForm.tsx
 ┃ ┃ ┃ ┗ 📜ResetPasswordForm.tsx
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┣ 📜AlertConfirmModal.tsx
 ┃ ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┃ ┣ 📜LanguageThemeDropDownMenu.tsx
 ┃ ┃ ┃ ┣ 📜LoadingModal.tsx
 ┃ ┃ ┃ ┣ 📜Pagination.tsx
 ┃ ┃ ┃ ┣ 📜Slider.tsx
 ┃ ┃ ┃ ┗ 📜UpperNavigation.tsx
 ┃ ┃ ┣ 📂navigation
 ┃ ┃ ┃ ┣ 📜DropdownMenu.tsx
 ┃ ┃ ┃ ┣ 📜SearchBar.tsx
 ┃ ┃ ┃ ┣ 📜UserActions.tsx
 ┃ ┃ ┃ ┗ 📜UserActionsMobile.tsx
 ┃ ┃ ┣ 📂policies
 ┃ ┃ ┃ ┣ 📜PrivacyPolicy.tsx
 ┃ ┃ ┃ ┣ 📜Sitemap.tsx
 ┃ ┃ ┃ ┗ 📜TermsOfService.tsx
 ┃ ┃ ┣ 📂shop
 ┃ ┃ ┃ ┣ 📜AllProductsSection.tsx
 ┃ ┃ ┃ ┣ 📜BestProductsSection.tsx
 ┃ ┃ ┃ ┣ 📜CartItem.tsx
 ┃ ┃ ┃ ┣ 📜CartItemList.tsx
 ┃ ┃ ┃ ┣ 📜CartSummary.tsx
 ┃ ┃ ┃ ┣ 📜FilterSection.tsx
 ┃ ┃ ┃ ┣ 📜PerfumeTips.tsx
 ┃ ┃ ┃ ┣ 📜ProductCard.tsx
 ┃ ┃ ┃ ┣ 📜ProductDetail.tsx
 ┃ ┃ ┃ ┣ 📜PromotionSection.tsx
 ┃ ┃ ┃ ┗ 📜SortingBar.tsx
 ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┣ 📜OrderManagement.tsx
 ┃ ┃ ┃ ┣ 📜OrderModal.tsx
 ┃ ┃ ┃ ┣ 📜UserInfoForm.tsx
 ┃ ┃ ┃ ┗ 📜UserOrdersForm.tsx
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📂admin
 ┃ ┃ ┃ ┗ 📜useAdmin.ts
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📜useCheckAuth.ts
 ┃ ┃ ┃ ┣ 📜useEmailVerification.ts
 ┃ ┃ ┃ ┣ 📜useFindEmail.ts
 ┃ ┃ ┃ ┣ 📜useLogin.ts
 ┃ ┃ ┃ ┣ 📜useLogout.ts
 ┃ ┃ ┃ ┣ 📜useModal.ts
 ┃ ┃ ┃ ┣ 📜useRegistration.ts
 ┃ ┃ ┃ ┗ 📜useResetPassword.ts
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┗ 📜useAlertConfirmModal.ts
 ┃ ┃ ┣ 📂navigation
 ┃ ┃ ┃ ┗ 📜useSearchBar.ts
 ┃ ┃ ┣ 📂shop
 ┃ ┃ ┃ ┗ 📜useProductFetch.ts
 ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┗ 📜useUserInfo.ts
 ┃ ┃ ┣ 📜useChangeLanguage.ts
 ┃ ┃ ┣ 📜useChangeTheme.ts
 ┃ ┃ ┣ 📜useMenuState.ts
 ┃ ┃ ┗ 📜useStoredSettings.ts
 ┃ ┣ 📂layout
 ┃ ┃ ┗ 📜Layout.tsx
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂admin
 ┃ ┃ ┃ ┗ 📜AdminDashboardPage.tsx
 ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┣ 📜FindAccountPage.tsx
 ┃ ┃ ┃ ┣ 📜LoginPage.tsx
 ┃ ┃ ┃ ┗ 📜RegistrationPage.tsx
 ┃ ┃ ┣ 📂main
 ┃ ┃ ┃ ┗ 📜MainPage.tsx
 ┃ ┃ ┣ 📂shop
 ┃ ┃ ┃ ┣ 📜CartPage.tsx
 ┃ ┃ ┃ ┣ 📜CheckoutPage.tsx
 ┃ ┃ ┃ ┣ 📜PaymentConfirmationPage.tsx
 ┃ ┃ ┃ ┣ 📜ProductDetailPage.tsx
 ┃ ┃ ┃ ┣ 📜ProductListPage.tsx
 ┃ ┃ ┃ ┗ 📜ShopHomePage.tsx
 ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┗ 📜UserProfilePage.tsx
 ┃ ┣ 📂redux
 ┃ ┃ ┣ 📂admin
 ┃ ┃ ┃ ┣ 📜adminSlice.ts
 ┃ ┃ ┃ ┗ 📜adminThunks.ts
 ┃ ┃ ┣ 📂cart
 ┃ ┃ ┃ ┗ 📜cartSlice.ts
 ┃ ┃ ┣ 📂order
 ┃ ┃ ┃ ┣ 📜orderSlice.ts
 ┃ ┃ ┃ ┗ 📜orderThunk.ts
 ┃ ┃ ┣ 📂product
 ┃ ┃ ┃ ┣ 📜productSlice.ts
 ┃ ┃ ┃ ┗ 📜productThunks.ts
 ┃ ┃ ┣ 📂slices
 ┃ ┃ ┃ ┣ 📜authSlice.ts
 ┃ ┃ ┃ ┣ 📜reviewSlice.ts
 ┃ ┃ ┃ ┗ 📜uiSlice.ts
 ┃ ┃ ┗ 📜store.ts
 ┃ ┣ 📂services
 ┃ ┃ ┣ 📜adminService.ts
 ┃ ┃ ┣ 📜authService.ts
 ┃ ┃ ┗ 📜userService.ts
 ┃ ┣ 📂type
 ┃ ┃ ┣ 📜admintypes.ts
 ┃ ┃ ┣ 📜authtypes.ts
 ┃ ┃ ┣ 📜orderTypes.ts
 ┃ ┃ ┣ 📜shoptypes.ts
 ┃ ┃ ┗ 📜usertypes.ts
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜auth.ts
 ┃ ┃ ┣ 📜debounce.ts
 ┃ ┃ ┗ 📜ScrollToTop.ts
 ┃ ┣ 📜App.css
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜index.css
 ┃ ┣ 📜main.tsx
 ┃ ┗ 📜vite-env.d.ts
 ┣ 📜.env
 ┣ 📜.eslintrc.cjs
 ┣ 📜index.html
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┣ 📜tsconfig.json
 ┣ 📜tsconfig.node.json
 ┗ 📜vite.config.ts
```

### 백엔드
```bash
 ┣ 📂src
 ┃ ┣ 📂config
 ┃ ┃ ┗ 📜database.js
 ┃ ┣ 📂controllers
 ┃ ┃ ┣ 📜adminController.js
 ┃ ┃ ┣ 📜authController.js
 ┃ ┃ ┣ 📜orderController.js
 ┃ ┃ ┣ 📜productController.js
 ┃ ┃ ┗ 📜userController.js
 ┃ ┣ 📂error
 ┃ ┃ ┗ 📜error.js
 ┃ ┣ 📂middleware
 ┃ ┃ ┗ 📜authenticateToken.js
 ┃ ┣ 📂routes
 ┃ ┃ ┣ 📜adminRoutes.js
 ┃ ┃ ┣ 📜authRoutes.js
 ┃ ┃ ┣ 📜orderRoutes.js
 ┃ ┃ ┣ 📜productRoutes.js
 ┃ ┃ ┗ 📜userRoutes.js
 ┃ ┣ 📂service
 ┃ ┃ ┣ 📜adminService.js
 ┃ ┃ ┣ 📜authService.js
 ┃ ┃ ┣ 📜orderService.js
 ┃ ┃ ┣ 📜productService.js
 ┃ ┃ ┣ 📜tokenService.js
 ┃ ┃ ┗ 📜userService.js
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜authUtils.js
 ┃ ┃ ┣ 📜emailUtils.js
 ┃ ┃ ┗ 📜tokenUtils.js
 ┃ ┗ 📜app.js
 ┣ 📜.env
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜server.js
```
