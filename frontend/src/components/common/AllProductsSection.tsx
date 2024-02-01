import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchMainPageProducts } from '../../redux/product/productThunks';
import ProductCard from '../shop/ProductCard';

const SectionTitle = styled.h2`
    font-size: 1.5em;
    text-align: center;
    margin-bottom: 20px;
`;

const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(
        auto-fill,
        minmax(200px, 1fr)
    ); /* 이것은 각 상품 카드의 최소 너비를 200px로 설정하고, 사용 가능한 공간에 따라 카드의 수를 채웁니다. */
    gap: 20px;
`;

const AllProductsSection: React.FC = () => {
    const dispatch = useDispatch();
    const { mainPageProducts, totalPages, currentPage } = useSelector(
        (state) => state.product
    );
    const [loading, setLoading] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);
    const lastProductElementRef = useRef();

    // 인터섹션 옵저버 콜백
    const lastProductCallback = (entries) => {
        if (entries[0].isIntersecting && currentPage < totalPages && !loading) {
            setLoading(true);
            dispatch(fetchMainPageProducts({ page: currentPage + 1 })).then(
                () => setLoading(false)
            );
        }
    };

    useEffect(() => {
        // 페이지 마운트 시 초기 데이터 로드
        if (mainPageProducts.length === 0 && !loading) {
            setLoading(true);
            dispatch(fetchMainPageProducts({ page: 1 })).then(() =>
                setLoading(false)
            );
        }
    }, [dispatch, mainPageProducts.length, loading]);

    // 인터섹션 옵저버 설정
    useEffect(() => {
        if (loading) {
            return;
        }

        if (observer.current) {
            observer.current.disconnect();
        }

        observer.current = new IntersectionObserver(lastProductCallback);
        if (lastProductElementRef.current) {
            observer.current.observe(lastProductElementRef.current);
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect();
            }
        };
    }, [loading]);

    return (
        <>
            <SectionTitle>BEST ITEM</SectionTitle>

            <ProductsGrid>
                {mainPageProducts.map((product, index) => {
                    if (mainPageProducts.length === index + 1) {
                        return (
                            <ProductCard
                                ref={lastProductElementRef}
                                key={product.productId}
                                product_Id={product.product_id}
                                image_Url={product.image_Url}
                                title={product.name}
                                price={product.price}
                            />
                        );
                    } else {
                        return (
                            <ProductCard
                                key={product.productId}
                                product_Id={product.product_id}
                                image_Url={product.image_Url}
                                title={product.name}
                                price={product.price}
                            />
                        );
                    }
                })}
                {loading && <p>Loading more products...</p>}
            </ProductsGrid>
        </>
    );
};

export default AllProductsSection;
