import { useState } from 'react';
import styled from 'styled-components';
import AllProductsSection from '../components/common/AllProductsSection';
import BestProductsSection from '../components/common/BestProductsSection';
import MDProductsSection from '../components/common/MDProductsSection';
import Slider from '../components/common/Slider';
import ProductCard from '../components/shop/ProductCard';
import PromotionSection from '../components/shop/PromotionSection';

const PageContainer = styled.div`
    max-width: 1200px; // 최대 너비를 설정하여 너무 넓은 화면에서 콘텐츠가 흩어지지 않도록 합니다.
    margin: 0 auto; // 좌우 마진을 auto로 설정하여 컨테이너를 화면 중앙에 배치합니다.
    padding: 20px; // 컨테이너 내부의 패딩을 설정합니다.
    background-color: #fff; // 배경색을 흰색으로 설정합니다.

    // 반응형 디자인을 위한 미디어 쿼리
    @media (max-width: 1200px) {
        max-width: 100%;
    }

    // 네비게이션 바 아래의 여백을 설정합니다.
    .navigation-bar + * {
        margin-top: 20px;
    }
`;

// 상품 리스트를 위한 스타일 컴포넌트
const ProductsSection = styled.section`
    padding: 40px 0; // 상하 패딩
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around; // 항목들이 균등하게 분포되도록 설정
    gap: 20px; // 항목들 사이의 간격
`;

const Section = styled.section`
    margin: 50px 0;
`;

const SectionTitle = styled.h2`
    font-size: 1.5em;
    text-align: center;
    margin-bottom: 20px;
`;

const ShopHomePage: React.FC = () => {
    return (
        <PageContainer>
            {/* 이미지 슬라이더 렌더링 */}
            <Slider />

            {/* 프로모션 섹션 렌더링 */}
            <PromotionSection />

            {/* MD’S CHOICE 섹션 */}
            <Section>
                <SectionTitle>MD’S CHOICE</SectionTitle>
                <MDProductsSection />
            </Section>

            {/* BEST ITEM 섹션 */}
            <Section>
                <SectionTitle>BEST ITEM</SectionTitle>
                <BestProductsSection />
            </Section>

            {/* 전체 상품 섹션 */}
            <Section>
                <SectionTitle>ALL ITEM</SectionTitle>
                <AllProductsSection />
            </Section>
        </PageContainer>
    );
};

export default ShopHomePage;
