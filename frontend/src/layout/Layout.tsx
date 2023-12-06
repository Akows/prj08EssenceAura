import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/common/Navigation';
import Footer from '../components/common/Footer';
import styled from 'styled-components';

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center; // 가로축에서 중앙 정렬
  min-height: calc(100vh - 60px); // 전체 높이에서 네비게이션 바와 푸터 높이를 뺀 만큼
  padding-top: 40px; // 네비게이션 바 높이만큼 상단 패딩을 줍니다.
`;

const Layout: React.FC = () => {
  return (
    <>
      <Navigation />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </>
  );
};

export default Layout;
