import styled from 'styled-components';
import AllProductsSection from '../../components/common/AllProductsSection';
import BestProductsSection from '../../components/common/BestProductsSection';
import Slider from '../../components/common/Slider';
import PromotionSection from '../../components/shop/PromotionSection';

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

const Section = styled.section`
    margin: 50px 0;
`;

const ShopHomePage: React.FC = () => {
    return (
        <PageContainer>
            {/* 이미지 슬라이더 렌더링 */}
            <Slider />

            {/* 프로모션 섹션 렌더링 */}
            <PromotionSection />

            {/* BEST ITEM 섹션 */}
            <Section>
                <BestProductsSection />
            </Section>

            {/* 전체 상품 섹션 */}
            <Section>
                <AllProductsSection />
            </Section>
        </PageContainer>
    );
};

export default ShopHomePage;
