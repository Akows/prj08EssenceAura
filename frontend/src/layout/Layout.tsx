import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/common/Footer';
import ShopNavigation from '../components/navigation/UpperNavigation';

const MainContent = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center; // 가로축에서 중앙 정렬
    min-height: calc(
        100vh - 60px
    ); // 전체 높이에서 네비게이션 바와 푸터 높이를 뺀 만큼
    padding-top: 40px; // 네비게이션 바 높이만큼 상단 패딩을 줍니다.
`;

const Layout: React.FC = () => {
    // 현재 경로를 확인하기 위해 useLocation 훅 사용
    const location = useLocation();

    // MainPage가 아닌 다른 페이지에서 ShopNavigation을 렌더링합니다.
    const showShopNavigation = location.pathname !== '/';

    return (
        <>
            {showShopNavigation && <ShopNavigation />}
            <MainContent>
                <Outlet />
            </MainContent>
            {showShopNavigation && <Footer />}
        </>
    );
};

export default Layout;
