import React, { useState } from 'react';
import styled from 'styled-components';

// TabButton에 적용할 타입을 확장하여 isActive 속성을 포함시킵니다.
interface TabButtonProps {
    isActive: boolean;
}

const ProductDetailContainer = styled.div`
    display: flex;
    flex-direction: column; // 자식 요소들을 수직으로 쌓기 위해 변경
    padding: 40px;
    background: #fff;
`;

const ProductImage = styled.img`
    width: 50%;
    max-width: 500px; // 이미지 최대 너비 설정
    margin-right: 20px;
`;

const ProductInfo = styled.div`
    flex-grow: 1;
`;

const ProductTitle = styled.h1`
    font-size: 24px;
    margin-bottom: 10px;
`;

const ProductPrice = styled.div`
    margin: 20px 0;
    font-size: 20px;
    color: #333;
`;

const BuyOptions = styled.div`
    // 스타일 작성
`;

const QuantitySelector = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const QuantityButton = styled.button`
    padding: 5px 10px;
    margin: 0 5px;
`;

const AddToCartButton = styled.button`
    background-color: black;
    color: white;
    padding: 10px 20px;
    margin-bottom: 10px;
    width: 100%;
`;

const BuyNowButton = styled.button`
    background-color: red;
    color: white;
    padding: 10px 20px;
    width: 100%;
`;

const Tabs = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 40px;
`;

const TabButton = styled.button<TabButtonProps>`
    padding: 10px 20px;
    border: 1px solid #ccc;
    background-color: ${(props) => (props.isActive ? '#fff' : '#f0f0f0')};
    cursor: pointer;
    outline: none;

    &:not(:last-child) {
        border-right: none; // 중간 탭 버튼들의 우측 테두리 제거
    }
`;

const ContentArea = styled.div`
    margin-top: 20px;
`;

const Section = styled.section`
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
`;

const ProductDetailPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('details');

    const renderContent = () => {
        switch (activeTab) {
            case 'details':
                return <Section>상품 상세정보</Section>;
            case 'reviews':
                return <Section>구매후기</Section>;
            case 'info':
                return <Section>안내사항</Section>;
            default:
                return <Section>선택된 탭에 해당하는 정보가 없습니다.</Section>;
        }
    };

    return (
        <>
            <ProductDetailContainer>
                <ProductImage
                    src="/path/to/product/image.jpg"
                    alt="Product Name"
                />
                <ProductInfo>
                    <ProductTitle>[브랜드] 상품명</ProductTitle>
                    <ProductPrice>380,000원</ProductPrice>
                    {/* 다른 상품 정보와 옵션을 여기에 포함 */}
                    <BuyOptions>
                        {/* 수량 선택 */}
                        <QuantitySelector>
                            <QuantityButton>-</QuantityButton>
                            <span>1</span>
                            <QuantityButton>+</QuantityButton>
                        </QuantitySelector>
                        {/* 장바구니 버튼 */}
                        <AddToCartButton>장바구니</AddToCartButton>
                        {/* 바로 구매 버튼 */}
                        <BuyNowButton>바로구매</BuyNowButton>
                    </BuyOptions>
                </ProductInfo>
            </ProductDetailContainer>

            {/* 탭 버튼들 */}
            <Tabs>
                <TabButton
                    isActive={activeTab === 'details'}
                    onClick={() => setActiveTab('details')}
                >
                    제품 상세정보
                </TabButton>
                <TabButton
                    isActive={activeTab === 'reviews'}
                    onClick={() => setActiveTab('reviews')}
                >
                    구매후기
                </TabButton>
                <TabButton
                    isActive={activeTab === 'info'}
                    onClick={() => setActiveTab('info')}
                >
                    안내사항
                </TabButton>
            </Tabs>

            {/* 탭 컨텐츠 */}
            <ContentArea>{renderContent()}</ContentArea>
        </>
    );
};

export default ProductDetailPage;
