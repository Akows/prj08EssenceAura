import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductCard from '../components/shop/ProductCard';
import PromotionSection from '../components/shop/PromotionSection';

// isActive 속성을 받기 위한 인터페이스 정의
interface DotProps {
    isActive: boolean;
}

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

const SliderContainer = styled.div`
    position: relative;
    height: 500px; // 슬라이더 높이 설정
    overflow: hidden;
`;

const Slide = styled.div`
    width: 100%;
    height: 100%;
    transition: all 0.5s ease-in-out;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover; // 이미지가 컨테이너를 꽉 채우도록 설정
    }
`;

const DotsContainer = styled.div`
    position: absolute;
    bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
`;

// DotProps 인터페이스를 사용하여 styled-component 정의
const Dot = styled.div<DotProps>`
    padding: 5px;
    margin-right: 5px;
    cursor: pointer;
    border-radius: 50%;
    background: ${(props) => (props.isActive ? 'black' : 'white')};
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

const ProductsGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`;

const TabList = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const Tab = styled.button`
    padding: 10px 20px;
    margin: 0 5px;
    border: none;
    background-color: ${(props) => (props.isActive ? '#000' : '#fff')};
    color: ${(props) => (props.isActive ? '#fff' : '#000')};
    border-bottom: ${(props) => (props.isActive ? '2px solid #000' : 'none')};

    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
`;

// 배너 예시
const banners = [
    '/banner1.jpg',
    '/banner2.jpg',
    '/banner3.jpg',
    // ... 더 많은 배너 이미지
];

// 상품 데이터의 예시 (실제 데이터는 API 호출로..)
const products = [
    {
        id: 1,
        imageUrl: '/product1.jpg',
        title: 'Product 1',
        price: '$19.99',
    },
    {
        id: 2,
        imageUrl: '/product2.jpg',
        title: 'Product 2',
        price: '$29.99',
    },
    {
        id: 3,
        imageUrl: '/product3.jpg',
        title: 'Product 3',
        price: '$39.99',
    },
    {
        id: 4,
        imageUrl: '/product4.jpg',
        title: 'Product 4',
        price: '$49.99',
    },
];

// 상품 데이터의 예시 - 실제로는 API에서 가져올 것입니다.
const mdProducts = [
    {
        id: 1,
        imageUrl: '/product1.jpg',
        title: 'Product 1',
        price: '$19.99',
    },
    {
        id: 2,
        imageUrl: '/product2.jpg',
        title: 'Product 2',
        price: '$29.99',
    },
    {
        id: 3,
        imageUrl: '/product3.jpg',
        title: 'Product 3',
        price: '$39.99',
    },
    {
        id: 4,
        imageUrl: '/product4.jpg',
        title: 'Product 4',
        price: '$49.99',
    },
    // ... MD'S CHOICE 제품 데이터
];

const bestProducts = {
    'WOMAN BEST': [
        // 여성 베스트 제품 데이터
        {
            id: 1,
            imageUrl: '/product1.jpg',
            title: 'Product 1',
            price: '$19.99',
        },
        {
            id: 2,
            imageUrl: '/product2.jpg',
            title: 'Product 2',
            price: '$29.99',
        },
        {
            id: 3,
            imageUrl: '/product3.jpg',
            title: 'Product 3',
            price: '$39.99',
        },
        {
            id: 4,
            imageUrl: '/product4.jpg',
            title: 'Product 4',
            price: '$49.99',
        },
    ],
    'MAN BEST': [
        // 남성 베스트 제품 데이터
        {
            id: 1,
            imageUrl: '/product1.jpg',
            title: 'Product 1',
            price: '$19.99',
        },
        {
            id: 2,
            imageUrl: '/product2.jpg',
            title: 'Product 2',
            price: '$29.99',
        },
        {
            id: 3,
            imageUrl: '/product3.jpg',
            title: 'Product 3',
            price: '$39.99',
        },
        {
            id: 4,
            imageUrl: '/product4.jpg',
            title: 'Product 4',
            price: '$49.99',
        },
    ],
    // ... 기타 카테고리
};

const HomePage: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('WOMAN BEST');

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) =>
                current === banners.length - 1 ? 0 : current + 1
            );
        }, 3000); // 3초마다 슬라이드 변경
        return () => clearInterval(interval);
    }, []);

    return (
        <PageContainer>
            {/* 이미지 슬라이더 렌더링 */}
            <SliderContainer>
                {banners.map((banner, index) => (
                    <Slide
                        key={index}
                        style={{
                            transform: `translateX(-${activeIndex * 100}%)`,
                        }}
                    >
                        <img src={banner} alt={`Banner ${index + 1}`} />
                    </Slide>
                ))}
                <DotsContainer>
                    {banners.map((_, index) => (
                        <Dot
                            key={index}
                            isActive={index === activeIndex}
                            onClick={() => setActiveIndex(index)}
                        />
                    ))}
                </DotsContainer>
            </SliderContainer>

            {/* 프로모션 섹션 렌더링 */}
            <PromotionSection />

            {/* 제품 리스트 섹션 */}
            <ProductsSection>
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        imageUrl={product.imageUrl}
                        title={product.title}
                        price={product.price}
                    />
                ))}
            </ProductsSection>

            {/* MD’S CHOICE 섹션 */}
            <Section>
                <SectionTitle>MD’S CHOICE</SectionTitle>
                <ProductsGrid>
                    {mdProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            imageUrl={product.imageUrl}
                            title={product.title}
                            price={product.price}
                        />
                    ))}
                </ProductsGrid>
            </Section>

            {/* BEST ITEM 섹션 */}
            <Section>
                <SectionTitle>BEST ITEM</SectionTitle>
                <TabList>
                    {Object.keys(bestProducts).map((category) => (
                        <Tab
                            key={category}
                            isActive={activeTab === category}
                            onClick={() => setActiveTab(category)}
                        >
                            {category}
                        </Tab>
                    ))}
                </TabList>
                <ProductsGrid>
                    {bestProducts[activeTab].map((product) => (
                        <ProductCard
                            key={product.id}
                            imageUrl={product.imageUrl}
                            title={product.title}
                            price={product.price}
                        />
                    ))}
                </ProductsGrid>
            </Section>
        </PageContainer>
    );
};

export default HomePage;
