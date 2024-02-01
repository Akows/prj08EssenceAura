import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductCard from '../shop/ProductCard';

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

const ProductsGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`;

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

const BestProductsSection: React.FC = () => {
    const [products, setProducts] = useState(bestProducts);

    useEffect(() => {
        // 서버에서 MD 추천상품 데이터를 가져오는 로직
        // 예시: setProducts(fetchMDProducts());
    }, []);

    // 'keyof BestProducts' 타입을 'activeTab' 상태에 적용
    const [activeTab, setActiveTab] =
        useState<keyof BestProducts>('WOMAN BEST');

    return (
        <>
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
        </>
    );
};

export default BestProductsSection;
