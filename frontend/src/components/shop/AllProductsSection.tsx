import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchMainPageProducts } from '../../redux/product/productThunks';
import ProductCard from './ProductCard';

const SectionTitle = styled.h2`
    font-size: 1.5em;
    text-align: center;
    margin-bottom: 20px;
`;

// ProductsGrid는 CSS Grid를 사용하여 상품 카드를 레이아웃합니다.
// auto-fill과 minmax를 사용하여 반응형 그리드 아이템을 생성합니다.
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
    // Redux 스토어에서 메인 페이지 상품 데이터와 페이지네이션 정보를 가져옵니다.
    const { mainPageProducts, totalPages, currentPage } = useSelector(
        (state) => state.product
    );
    const [loading, setLoading] = useState(false);

    // useRef를 사용하여 인터섹션 옵저버 인스턴스를 참조할 ref를 생성합니다.
    // 이 ref는 컴포넌트의 라이프사이클 동안 지속되며 변하지 않습니다
    const observer = useRef<IntersectionObserver | null>(null);

    // 마지막 상품 요소를 참조할 ref입니다. 이 ref는 마지막 상품 컴포넌트에 연결되고,
    // 인터섹션 옵저버에 의해 관찰됩니다.
    const lastProductElementRef = useRef();

    // 인터섹션 옵저버 콜백 함수입니다.
    // entries 파라미터는 관찰되는 요소들의 목록입니다.
    const lastProductCallback = (entries: IntersectionObserverEntry[]) => {
        // 첫 번째 요소(entries[0])가 교차하는지 확인합니다.
        if (entries[0].isIntersecting && currentPage < totalPages && !loading) {
            // 마지막 상품이 화면에 보일 때 데이터 로딩 상태를 true로 설정합니다.
            setLoading(true);
            // 다음 페이지의 상품을 가져오는 액션을 디스패치합니다.
            dispatch(fetchMainPageProducts({ page: currentPage + 1 })).then(
                () => {
                    // 상품 로딩 완료 후, 로딩 상태를 false로 설정합니다.
                    setLoading(false);
                }
            );
        }
    };

    // 컴포넌트 마운트 시 최초 데이터를 로드하는 useEffect 훅입니다.
    useEffect(() => {
        // 메인 페이지 상품이 없고 로딩 중이 아닌 경우,
        // 첫 페이지의 상품 데이터를 로딩합니다.
        if (mainPageProducts.length === 0 && !loading) {
            setLoading(true);
            dispatch(fetchMainPageProducts({ page: 1 })).then(() =>
                setLoading(false)
            );
        }
    }, [dispatch, mainPageProducts.length, loading]);

    // 컴포넌트의 라이프사이클 또는 로딩 상태가 변경될 때마다 실행됩니다.
    useEffect(() => {
        if (loading) {
            // 로딩 중인 경우 인터섹션 옵저버 설정을 스킵합니다.
            return;
        }

        // 이미 인터섹션 옵저버 인스턴스가 있다면 연결을 해제합니다.
        if (observer.current) {
            observer.current.disconnect();
        }

        // 새 인터섹션 옵저버 인스턴스를 생성하고, 콜백 함수를 설정합니다.
        observer.current = new IntersectionObserver(lastProductCallback);

        // lastProductElementRef가 현재 DOM 요소를 가리키고 있다면 관찰을 시작합니다.
        if (lastProductElementRef.current) {
            observer.current.observe(lastProductElementRef.current);
        }

        // 컴포넌트가 언마운트되거나, before the component unmounts or the observer is re-created,
        // useEffect가 재실행되기 전에 인터섹션 옵저버 연결을 해제합니다.
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
                    // 마지막 상품 요소에만 ref를 설정하여 인터섹션 옵저버가 감지할 수 있게 합니다.
                    if (mainPageProducts.length === index + 1) {
                        return (
                            <ProductCard
                                ref={lastProductElementRef}
                                key={product.productId}
                                product_Id={product.product_id}
                                image_url={product.image_url}
                                title={product.name}
                                price={product.price}
                                discount_rate={product.discount_rate}
                                final_price={product.final_price}
                            />
                        );
                    } else {
                        return (
                            <ProductCard
                                key={product.productId}
                                product_Id={product.product_id}
                                image_url={product.image_url}
                                title={product.name}
                                price={product.price}
                                discount_rate={product.discount_rate}
                                final_price={product.final_price}
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
