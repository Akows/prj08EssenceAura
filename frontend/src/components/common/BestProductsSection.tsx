import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { fetchTopSellingProductsByCategory } from '../../redux/product/productThunks';
import ProductCard from '../shop/ProductCard';

// Tab 컴포넌트 정의
interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isActive: boolean;
}

const SectionTitle = styled.h2`
    font-size: 1.5em;
    text-align: center;
    margin-bottom: 20px;
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

const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(
        auto-fill,
        minmax(200px, 1fr)
    ); /* 이것은 각 상품 카드의 최소 너비를 200px로 설정하고, 사용 가능한 공간에 따라 카드의 수를 채웁니다. */
    gap: 20px;
`;

const BestProductsSection: React.FC = () => {
    const dispatch = useDispatch();
    // Redux Store에서 상품 데이터를 가져옵니다.
    const topSellingProducts =
        useSelector((state) => state.product.topSellingProductsByCategory) ||
        [];

    const [activeTab, setActiveTab] = useState<
        '여성향수' | '남성향수' | '남녀공용'
    >('여성향수');

    useEffect(() => {
        // topSellingProducts가 비어있을 경우에만 데이터를 가져옵니다.
        if (topSellingProducts.length === 0) {
            dispatch(fetchTopSellingProductsByCategory());
        }
    }, [dispatch, topSellingProducts.length]);

    // 선택된 탭에 따라 상품을 필터링합니다.
    const filteredProducts = topSellingProducts
        .filter((product) => product.category === activeTab)
        .slice(0, 8);

    return (
        <>
            <SectionTitle>BEST ITEM</SectionTitle>

            <TabList>
                <Tab
                    isActive={activeTab === '여성향수'}
                    onClick={() => setActiveTab('여성향수')}
                >
                    여성향수
                </Tab>
                <Tab
                    isActive={activeTab === '남성향수'}
                    onClick={() => setActiveTab('남성향수')}
                >
                    남성향수
                </Tab>
                <Tab
                    isActive={activeTab === '남녀공용'}
                    onClick={() => setActiveTab('남녀공용')}
                >
                    남녀공용
                </Tab>
            </TabList>

            <ProductsGrid>
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.product_id}
                        product_Id={product.product_id}
                        image_url={product.image_url}
                        title={product.name}
                        price={`$${Number(product.price).toFixed(2)}`}
                    />
                ))}
            </ProductsGrid>
        </>
    );
};

export default BestProductsSection;
