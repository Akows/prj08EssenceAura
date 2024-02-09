import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import AlertConfirmModal from '../../components/common/AlertConfirmModal';
import LoadingModal from '../../components/common/LoadingModal';
import PerfumeTips from '../../components/shop/PerfumeTips';
import ProductDetail from '../../components/shop/ProductDetail';
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
    font-size: 24px; // 기존 20px에서 크기를 늘림
    color: #333;
    margin-bottom: 16px; // 여백 추가
`;

const Description = styled.p`
    color: #666;
    font-size: 16px;
    line-height: 1.6; // 줄 간격 조정
`;

const PriceSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between; // 가격 정보를 가로로 나열하기 위해 변경
    background: #f8f8f8; // 배경색을 부드러운 회색으로 설정
    padding: 10px;
    border-radius: 8px; // 모서리 둥글게 처리
    margin-top: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // 그림자 추가
`;

const PriceTag = styled.div`
    display: flex;
    align-items: baseline; // 글자 기준선에 맞춰 정렬
`;

const OriginalPrice = styled.span`
    font-size: 14px; // 글자 크기 수정
    text-decoration: line-through; // 취소선
    color: #999;
    margin-right: 5px; // 오른쪽 여백 추가
`;

const DiscountRate = styled.span`
    font-size: 14px; // 글자 크기 수정
    color: #ff6b6b; // 할인률의 색상 변경
    margin-right: 5px; // 오른쪽 여백 추가
`;

const FinalPrice = styled.span`
    font-size: 16px; // 최종 가격의 글자 크기를 더 크게 설정
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
    const navigate = useNavigate();
    const { product_Id } = useParams(); // URL로부터 상품 ID를 가져옵니다.

    const { selectedProduct, loading, error } = useSelector((state) => ({
        ...state.product,
    }));

    const { isLoggedIn } = useSelector((state) => ({
        ...state.auth,
    }));

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Math.max(1, Number(e.target.value));
        setQuantity(newQuantity);
    };

    const renderContent = () => {
        const products = selectedProduct || [];

        if (products.length === 0) {
            return <Section>상품 정보를 불러오는 중...</Section>;
        }

        switch (activeTab) {
            case 'details':
                return (
                    <ProductDetail
                        imageUrl={selectedProduct[0]?.descimage_url}
                        productName={selectedProduct[0]?.name}
                        productDescription={selectedProduct[0]?.description}
                        perfumeType={selectedProduct[0]?.category}
                    />
                );
            case 'info':
                return <PerfumeTips />;
            default:
                return <Section>선택된 탭에 해당하는 정보가 없습니다.</Section>;
        }
    };

    const handlePlaceCart = () => {
        if (window.confirm('장바구니에서 제품을 추가하시겠습니까?')) {
            if (quantity > 0) {
                // 로컬 스토리지에서 현재 장바구니 아이템을 불러옵니다.
                const cart = JSON.parse(localStorage.getItem('cart') || '[]');

                // 선택된 상품이 장바구니에 이미 있는지 확인합니다.
                const existingItemIndex = cart.findIndex(
                    (item) => item.product_id === selectedProduct[0]?.product_id
                );

                if (existingItemIndex !== -1) {
                    // 상품이 이미 있으면, 수량만 업데이트합니다.
                    cart[existingItemIndex].quantity = quantity;
                } else {
                    // 새로운 상품을 장바구니에 추가합니다.
                    const newItem = {
                        product_id: selectedProduct[0]?.product_id,
                        image_url: selectedProduct[0]?.image_url,
                        name: selectedProduct[0]?.name,
                        final_price: selectedProduct[0]?.final_price,
                        quantity: quantity, // 수량
                        // selectedProduct에서 필요한 다른 필드를 추가하세요.
                    };
                    cart.push(newItem);
                }

                // 장바구니를 로컬 스토리지에 저장합니다.
                localStorage.setItem('cart', JSON.stringify(cart));

                // 사용자를 장바구니 페이지로 이동시킵니다.
                navigate('/shopcart');
            } else {
                alert('수량을 선택해주세요.');
            }
        } else {
            return;
        }
    };

    const handleCheckOrder = () => {
        if (window.confirm('제품을 구매하시겠습니까?')) {
            if (!isLoggedIn) {
                alert('로그인한 사용자만 구매가 가능합니다.');
                navigate('/login');
                return;
            }

            if (quantity === 0) {
                alert('수량을 선택해주세요.');
                return;
            }

            // navigate 함수를 통해 결제 페이지로 상품 정보와 수량을 전달합니다.
            navigate('/checkout', {
                state: {
                    product: selectedProduct[0], // 현재 선택된 상품의 정보
                    quantity: quantity, // 선택된 수량
                },
            });
        } else {
            return;
        }
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
                            src={selectedProduct[0]?.image_url}
                            alt={selectedProduct[0]?.name}
                        />
                        <ProductDetails>
                            <Title>{selectedProduct[0]?.name}</Title>
                            <Description>
                                {selectedProduct[0]?.description}
                            </Description>
                        </ProductDetails>
                    </ProductSection>
                    <PriceSection>
                        <PriceTag>
                            {selectedProduct[0]?.discount_rate > 0 && (
                                <>
                                    <OriginalPrice>
                                        {new Intl.NumberFormat().format(
                                            Math.round(
                                                Number(
                                                    selectedProduct[0]?.price
                                                )
                                            )
                                        )}
                                        원
                                    </OriginalPrice>
                                    <DiscountRate>
                                        -
                                        {Math.round(
                                            Number(
                                                selectedProduct[0]
                                                    ?.discount_rate
                                            )
                                        )}
                                        %
                                    </DiscountRate>
                                </>
                            )}
                        </PriceTag>
                        <FinalPrice>
                            {new Intl.NumberFormat().format(
                                Math.round(
                                    Number(selectedProduct[0]?.final_price)
                                )
                            )}
                            원
                        </FinalPrice>
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
                    min="1" // 최소값 설정
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
