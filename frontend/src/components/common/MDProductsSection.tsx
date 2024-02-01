import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductCard from '../shop/ProductCard';

interface Product {
    id: number;
    imageUrl: string;
    title: string;
    price: string;
}

const ProductsGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`;

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

const MDProductsSection: React.FC = () => {
    const [products, setProducts] = useState(mdProducts);

    useEffect(() => {
        // 서버에서 MD 추천상품 데이터를 가져오는 로직
        // 예시: setProducts(fetchMDProducts());
    }, []);

    return (
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
    );
};

export default MDProductsSection;
