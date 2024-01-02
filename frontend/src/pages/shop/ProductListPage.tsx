import React, { useState } from 'react';
import styled from 'styled-components';
import ProductCard from '../../components/shop/ProductCard';

// 상품 데이터 인터페이스
interface Product {
    id: number;
    imageUrl: string;
    title: string;
    price: string;
}

// 정렬 옵션 타입
type SortOption = 'newest' | 'price_low_high' | 'price_high_low';

const ProductListContainer = styled.div`
    display: flex; // 수평 레이아웃을 위한 flex 설정
    padding: 40px;
    background: #f8f8f8;
    justify-content: space-between; // 컨테이너 내의 아이템 간격을 균등하게 분배
    @media (max-width: 1024px) {
        flex-direction: column; // 모바일 뷰에서는 컬럼 방향으로 변경
    }
`;

const ProductListTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
`;

const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-left: 40px; // Sidebar와의 간격 추가
    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
        margin-left: 0; // 모바일 뷰에서는 간격을 제거
    }
`;

const Sidebar = styled.aside`
    border: 1px solid #ddd;
    padding: 20px;
    width: 200px;
    @media (max-width: 1024px) {
        width: auto;
        margin-bottom: 20px;
    }
`;

const CategoryList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const CategoryItem = styled.li`
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const SortingBar = styled.div`
    display: flex;
    justify-content: flex-end; // 정렬 옵션을 오른쪽에 붙임
    margin-bottom: 20px;
    width: 100%;
`;

const SortButton = styled.button`
    padding: 5px 10px;
    margin-left: 10px;
    border: 1px solid #ddd;
    background: transparent;
    cursor: pointer;

    &:hover {
        background: #f0f0f0;
    }

    &.active {
        border-color: #000;
        font-weight: bold;
    }
`;

// 예시 상품 데이터
const products: Product[] = [
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

const ProductListPage: React.FC = () => {
    // 정렬 상태를 위한 useState 훅
    const [currentSort, setCurrentSort] = useState<SortOption>('newest');

    // 정렬 방식 변경 핸들러
    const handleSortChange = (sortOption: SortOption) => {
        setCurrentSort(sortOption);
        // 상품 목록 정렬 로직을 여기에 추가...
    };

    return (
        <ProductListContainer>
            <Sidebar>
                <h3>카테고리</h3>
                <CategoryList>
                    <CategoryItem>향수 전체 (63)</CategoryItem>
                    {/* 여기에 추가 카테고리 항목을 넣을 수 있습니다. */}
                </CategoryList>
            </Sidebar>

            <main>
                {/* 정렬 옵션 바 */}
                <SortingBar>
                    <SortButton
                        className={currentSort === 'newest' ? 'active' : ''}
                        onClick={() => handleSortChange('newest')}
                    >
                        신상품
                    </SortButton>
                    <SortButton
                        className={
                            currentSort === 'price_low_high' ? 'active' : ''
                        }
                        onClick={() => handleSortChange('price_low_high')}
                    >
                        낮은 가격
                    </SortButton>
                    <SortButton
                        className={
                            currentSort === 'price_high_low' ? 'active' : ''
                        }
                        onClick={() => handleSortChange('price_high_low')}
                    >
                        높은 가격
                    </SortButton>
                </SortingBar>

                {/* 상품 리스트 제목 */}
                <ProductListTitle>전체 상품</ProductListTitle>

                {/* 상품 그리드 */}
                <ProductGrid>
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            imageUrl={product.imageUrl}
                            title={product.title}
                            price={product.price}
                        />
                    ))}
                </ProductGrid>
            </main>
            {/* 페이지네이션, 필터, 정렬 컴포넌트를 여기에 추가할 수 있습니다. */}
        </ProductListContainer>
    );
};

export default ProductListPage;
