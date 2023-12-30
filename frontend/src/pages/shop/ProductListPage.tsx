import React from 'react';
import styled from 'styled-components';
import ProductCard from '../../components/shop/ProductCard';

// 상품 데이터 인터페이스
interface Product {
    id: number;
    imageUrl: string;
    title: string;
    price: string;
}

const ProductListContainer = styled.div`
    display: flex; // 수평 레이아웃을 위한 flex 설정
    padding: 40px;
    background: #f8f8f8;
    @media (max-width: 1024px) {
        flex-direction: column; // 모바일 뷰에서는 컬럼 방향으로 변경
    }
`;

const ProductListTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center; // 제목을 가운데 정렬
`;

const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const Sidebar = styled.aside`
    border: 1px solid #ddd;
    padding: 20px;
    width: 200px; // 사이드바의 너비 고정
    @media (max-width: 1024px) {
        width: auto; // 모바일 뷰에서는 너비를 자동으로 조정
        margin-right: 0; // 모바일 뷰에서는 오른쪽 마진 제거
        margin-bottom: 20px; // 아래쪽 마진 추가
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
        text-decoration: underline; // 호버 시 밑줄 효과 추가
    }
`;

const SortingBar = styled.div`
    display: flex;
    justify-content: center; // 가운데 정렬
    margin-bottom: 20px;
    width: 100%; // 전체 너비를 차지하도록 설정
`;

const SortingOption = styled.select`
    padding: 5px;
    margin-left: 10px;
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
    // 페이지 유형에 따른 상품 목록을 렌더링할 수 있는 상태와 로직을 추가할 수 있습니다.

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
                    <label htmlFor="sort">정렬:</label>
                    <SortingOption id="sort">
                        <option value="newest">신상품순</option>
                        <option value="price_low_high">가격 낮은순</option>
                        <option value="price_high_low">가격 높은순</option>
                        {/* 다른 정렬 옵션을 추가할 수 있습니다. */}
                    </SortingOption>
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
