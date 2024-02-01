import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import AlertConfirmModal from '../../components/common/AlertConfirmModal';
import LoadingModal from '../../components/common/LoadingModal';
import { fetchProduct } from '../../redux/product/productThunks';

// TabButton에 적용할 타입을 확장하여 isActive 속성을 포함시킵니다.
interface TabButtonProps {
    isActive: boolean;
}

const PageContainer = styled.div`
    margin: 30px;
    max-width: 800px;
    padding: 20px;

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

const ProductSection = styled.section`
    display: flex;
    margin-top: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const ProductImage = styled.img`
    max-width: 300px;
    margin-right: 20px;

    @media (max-width: 768px) {
        margin-right: 0;
        margin-bottom: 20px;
    }
`;

const ProductDetails = styled.div`
    flex: 1;

    @media (max-width: 768px) {
        text-align: center;
    }
`;

const Title = styled.h2`
    font-size: 20px;
    color: #333;
`;

const PriceSection = styled.div`
    margin-top: 20px;
`;

const Price = styled.span`
    font-size: 18px;
    color: #e44d26;
    font-weight: bold;
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

    @media (max-width: 768px) {
        flex-direction: column;
    }
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

    @media (max-width: 768px) {
        width: 100%;
        margin-right: 0;
        margin-bottom: 10px;

        &:last-child {
            margin-bottom: 0;
        }
    }
`;

const Tabs = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
    }
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

    @media (max-width: 768px) {
        width: 100%;
        &:not(:last-child) {
            border-bottom: 1px solid #ddd;
        }
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

    const dispatch = useDispatch();
    const { product_Id } = useParams(); // URL로부터 상품 ID를 가져옵니다.

    const { selectedProduct, loading, error } = useSelector((state) => ({
        ...state.product,
    }));

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value));
    };

    const renderContent = () => {
        const products = selectedProduct || [];

        if (products.length === 0) {
            return <Section>상품 정보를 불러오는 중...</Section>;
        }

        switch (activeTab) {
            case 'details':
                return <Section>{selectedProduct[0]?.description}</Section>;
            case 'info':
                return <Section>안내사항</Section>;
            default:
                return <Section>선택된 탭에 해당하는 정보가 없습니다.</Section>;
        }
    };

    const handlePlaceCart = () => {
        window.location.href = '/shopcart';
    };

    const handleCheckOrder = () => {
        window.location.href = '/checkout';
    };

    useEffect(() => {
        if (product_Id) {
            dispatch(fetchProduct(Number(product_Id))); // 상품 정보를 가져옵니다.
        }
    }, [dispatch, product_Id]);

    // 로딩 상태에서는 로딩 모달을..
    if (loading) {
        return <LoadingModal />;
    }

    // 에러 상태에서는 에러 모달이 출력되도록
    if (error) {
        return (
            <AlertConfirmModal title="오류" onClose={() => {}}>
                {error}
            </AlertConfirmModal>
        );
    }

    return (
        <PageContainer>
            {selectedProduct?.length > 0 ? (
                <>
                    <ProductSection>
                        {/* 선택적 체이닝을 사용하여 selectedProduct[0]이 없을 때 오류 방지 */}
                        <ProductImage
                            src={selectedProduct[0]?.image_Url}
                            alt={selectedProduct[0]?.name}
                        />
                        <ProductDetails>
                            <Title>{selectedProduct[0]?.name}</Title>
                        </ProductDetails>
                    </ProductSection>
                    <PriceSection>
                        <Price>₩{selectedProduct[0]?.price}</Price>
                    </PriceSection>
                </>
            ) : (
                // selectedProduct가 비어있을 때 표시할 내용
                <Section>상품 정보를 불러오는 중...</Section>
            )}

            <QuantitySelector>
                <QuantityInput
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                />
            </QuantitySelector>
            <PurchaseSection>
                <Button onClick={handlePlaceCart}>장바구니에 추가</Button>
                <Button onClick={handleCheckOrder}>지금 구매하기</Button>
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
