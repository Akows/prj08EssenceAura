import React, { ChangeEvent, useState } from 'react';
import styled, { css } from 'styled-components';

// TabButton에 적용할 타입을 확장하여 isActive 속성을 포함시킵니다.
interface TabButtonProps {
    isActive: boolean;
}

const PageContainer = styled.div`
    margin: auto;
    max-width: 800px;
`;

const ProductSection = styled.section`
    display: flex;
    margin-top: 20px;
`;

const ProductImage = styled.img`
    max-width: 300px;
    margin-right: 20px;
`;

const ProductDetails = styled.div`
    flex: 1;
`;

const Title = styled.h2`
    font-size: 20px;
    color: #333;
`;

const Description = styled.p`
    color: #666;
`;

const PriceSection = styled.div`
    margin-top: 20px;
`;

const Price = styled.span`
    font-size: 18px;
    color: #e44d26;
    font-weight: bold;
`;

const OptionsSection = styled.div`
    margin-top: 20px;
`;

const Select = styled.select`
    padding: 5px;
    margin-right: 10px;
`;

const QuantitySelector = styled.div`
    margin-top: 20px;
`;

const QuantityInput = styled.input`
    width: 50px;
    padding: 5px;
`;

const PurchaseSection = styled.div`
    margin-top: 20px;
`;

const Button = styled.button`
    background-color: #e44d26;
    color: white;
    border: none;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    margin-right: 10px;
    &:hover {
        background-color: #f55f3b;
    }
`;

const Tabs = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const TabButton = styled.button<TabButtonProps>`
    padding: 10px 20px;
    border: none;
    background-color: #f3f3f3;
    cursor: pointer;
    border-bottom: 3px solid transparent;

    ${({ isActive }) =>
        isActive &&
        css`
            background-color: white;
            border-color: #e44d26;
            color: #e44d26;
        `}

    &:hover {
        background-color: white;
    }
`;

const ContentArea = styled.div`
    padding: 20px;
    border: 1px solid #ddd;
    margin-top: -3px; // Adjust for the TabButton border
`;

const Section = styled.section`
    color: #666;
`;

const ProductDetailPage: React.FC = () => {
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('details');

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value));
    };

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
        <PageContainer>
            <ProductSection>
                <ProductImage
                    src="https://via.placeholder.com/300"
                    alt="Product"
                />
                <ProductDetails>
                    <Title>멋진 향수</Title>
                    <Description>
                        이 향수는 당신의 매력을 더해줄 멋진 향기를 가지고
                        있습니다.
                    </Description>
                </ProductDetails>
            </ProductSection>
            <PriceSection>
                <Price>₩35,000</Price>
            </PriceSection>
            <OptionsSection>
                <Select>
                    <option>50ml</option>
                    <option>100ml</option>
                </Select>
                <Select>
                    <option>Red</option>
                    <option>Blue</option>
                </Select>
            </OptionsSection>
            <QuantitySelector>
                <QuantityInput
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                />
            </QuantitySelector>
            <PurchaseSection>
                <Button>장바구니에 추가</Button>
                <Button>지금 구매하기</Button>
            </PurchaseSection>

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
        </PageContainer>
    );
};

export default ProductDetailPage;
