import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProductCard from '../components/shop/ProductCard';
import PromotionSection from '../components/shop/PromotionSection';

// isActive 속성을 받기 위한 인터페이스 정의
interface DotProps {
    isActive: boolean;
}

interface Product {
    id: number;
    imageUrl: string;
    title: string;
    price: string;
}

interface BestProducts {
    'WOMAN BEST': Product[];
    'MAN BEST': Product[];
}

// Tab 컴포넌트 정의
interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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

const SliderControls = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
    padding: 0 20px;
    box-sizing: border-box;
`;

// 슬라이더 내부의 각 버튼 컴포넌트
const ControlButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px; // 아이콘의 크기 조정
    color: black; // 아이콘의 색상
    transition: background-color 0.3s;

    &:hover {
        background-color: rgba(255, 255, 255, 0.5); // 호버 시 버튼 배경색 변경
        border-radius: 50%; // 호버 시 버튼 모양을 원형으로 변경
    }
`;

const PlayPauseButton = styled(ControlButton)`
    width: 30px;
    height: 30px;
    position: absolute;
    bottom: 16.5px;
    right: 10px;
`;

// 슬라이더 하단의 도트 컨테이너 스타일
const DotsContainer = styled.div`
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    padding: 5px 10px;
    background: rgba(0, 0, 0, 0.5); // 도트의 배경색
    border-radius: 20px; // 도트 컨테이너의 모서리 둥글게 처리
`;

// 슬라이더 하단의 도트 스타일
const Dot = styled.button<DotProps>`
    padding: 5px;
    margin: 0 5px;
    cursor: pointer;
    background-color: ${(props) =>
        props.isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)'};
    border-radius: 50%; // 도트를 원형으로 만듦
    border: none;
    transition: background-color 0.3s;

    &:hover {
        background-color: #ffffff;
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

const Tab = styled.button<TabProps>`
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
const mdProducts: Product[] = [
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

const bestProducts: BestProducts = {
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

const ShopHomePage: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    // 'keyof BestProducts' 타입을 'activeTab' 상태에 적용
    const [activeTab, setActiveTab] =
        useState<keyof BestProducts>('WOMAN BEST');

    // 슬라이드 이동 함수
    const goToSlide = (index: number) => {
        if (index < 0) {
            // 첫 번째 슬라이드 이전으로 가려고 할 때 마지막 슬라이드로 설정
            setActiveIndex(banners.length - 1);
        } else if (index > banners.length - 1) {
            // 마지막 슬라이드를 넘어서려고 할 때 첫 번째 슬라이드로 설정
            setActiveIndex(0);
        } else {
            // 그 외에는 선택된 인덱스로 설정
            setActiveIndex(index);
        }
    };
    // 자동 이동 함수
    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    // 슬라이드 자동 이동
    useEffect(() => {
        let interval: number | undefined; // interval의 타입을 number로 지정
        if (isPlaying) {
            interval = window.setInterval(() => {
                // window를 명시하여 브라우저의 setInterval을 사용한다는 것을 분명히 함
                setActiveIndex((current) =>
                    current === banners.length - 1 ? 0 : current + 1
                );
            }, 3000);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isPlaying, banners.length]);

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
                <SliderControls>
                    <ControlButton onClick={() => goToSlide(activeIndex - 1)}>
                        &#10094; {/* Left arrow */}
                    </ControlButton>
                    <ControlButton onClick={() => goToSlide(activeIndex + 1)}>
                        &#10095; {/* Right arrow */}
                    </ControlButton>
                </SliderControls>
                <DotsContainer>
                    {banners.map((_, index) => (
                        <Dot
                            key={index}
                            isActive={index === activeIndex}
                            onClick={() => setActiveIndex(index)}
                        />
                    ))}
                </DotsContainer>
                <PlayPauseButton onClick={togglePlayPause}>
                    {isPlaying ? '||' : '▶'}
                </PlayPauseButton>
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
                            onClick={() =>
                                setActiveTab(category as keyof BestProducts)
                            }
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

export default ShopHomePage;
