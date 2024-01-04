import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';

const CheckoutContainer = styled.div`
    width: 80%;
    max-width: 1200px;
    margin-top: 60px;
`;

const Breadcrumb = styled.div`
    font-size: 12px;
    color: #666;
    margin-top: 20px;
`;

const ProductList = styled.div`
    margin-top: 20px;
`;

const ProductItem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const ProductImage = styled.img`
    width: 60px;
    height: 60px;
    margin-right: 10px;
`;

const ProductName = styled.span`
    flex: 1;
`;

const ProductQuantity = styled.span`
    margin-right: 10px;
`;

const ProductPrice = styled.span``;

const UserInfo = styled.div`
    margin-top: 20px;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    box-sizing: border-box;
`;

const Checkbox = styled.input`
    margin-right: 5px;
`;

const OrderSummary = styled.div`
    margin-top: 20px;
`;

const PaymentMethod = styled.div`
    margin-top: 20px;
`;

const RadioGroup = styled.div`
    margin-bottom: 10px;
`;

const ButtonGroup = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
`;

const Button = styled.button`
    padding: 10px 20px;
    border: none;
    background-color: #e44d26;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #f55f3b;
    }
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
`;

const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const RadioLabel = styled.label`
    display: flex;
    align-items: center;
`;

const SummaryRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const AgreementSection = styled.div`
    margin-top: 20px;
`;

const AgreementCheckbox = styled.input`
    margin-right: 5px;
`;

const AgreementText = styled.span`
    font-size: 14px;
`;

const CheckoutPage: React.FC = () => {
    // 예시 데이터.
    const [products] = useState([
        { id: 1, name: '향수 A', quantity: 1, price: 35000 },
        // 다른 제품들...
    ]);

    // 예시 주문 요약 정보
    const [orderSummary] = useState({
        total: 70000,
        shipping: 2500,
        discount: 0,
        totalDue: 72500,
    });

    // 결제 방법 선택을 위한 상태
    const [paymentMethod, setPaymentMethod] = useState('transfer');

    // 주문자 동의 여부 상태
    const [agreement, setAgreement] = useState(false);

    // 주문하기 버튼 클릭 핸들러
    const handlePlaceOrder = () => {
        // 주문 로직 처리
        // 예시로 alert을 띄우고 페이지 이동
        alert('주문이 완료되었습니다.');
        window.location.href = '/confirm';
    };

    // 주문 취소 버튼 클릭 핸들러
    const handleCancelOrder = () => {
        // 주문 취소 로직 처리
        // 예시로 홈페이지로 이동
        window.location.href = '/shop';
    };

    return (
        <CheckoutContainer>
            <Breadcrumb>쇼핑몰 {'>'} 구매확인</Breadcrumb>

            <ProductList>
                {products.map((product) => (
                    <ProductItem key={product.id}>
                        <ProductImage
                            src={`https://via.placeholder.com/60`}
                            alt={product.name}
                        />
                        <ProductName>{product.name}</ProductName>
                        <ProductQuantity>{product.quantity}개</ProductQuantity>
                        <ProductPrice>{product.price}원</ProductPrice>
                    </ProductItem>
                ))}
            </ProductList>

            <UserInfo>
                {/* 주문자 정보 입력 UI */}
                <Label htmlFor="name">이름</Label>
                <Input id="name" type="text" placeholder="이름을 입력하세요" />

                <Label htmlFor="email">이메일</Label>
                <Input
                    id="email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                />

                <Label htmlFor="phone">연락처</Label>
                <Input
                    id="phone"
                    type="tel"
                    placeholder="연락처를 입력하세요"
                />
            </UserInfo>

            <UserInfo>
                {/* 배송 정보 입력 UI */}
                <CheckboxLabel>
                    <Checkbox type="checkbox" />
                    주문자 정보와 동일
                </CheckboxLabel>

                <Label htmlFor="shippingName">이름</Label>
                <Input
                    id="shippingName"
                    type="text"
                    placeholder="이름을 입력하세요"
                />

                <Label htmlFor="shippingPhone">연락처</Label>
                <Input
                    id="shippingPhone"
                    type="tel"
                    placeholder="연락처를 입력하세요"
                />

                <Label htmlFor="address">주소</Label>
                <Input
                    id="address"
                    type="text"
                    placeholder="배송 주소를 입력하세요"
                />

                <Label htmlFor="orderNote">주문 메시지</Label>
                <Input
                    id="orderNote"
                    type="text"
                    placeholder="주문과 관련된 메시지가 있다면 입력하세요"
                />
            </UserInfo>

            <OrderSummary>
                {/* 주문 요약 정보 출력 */}
                <SummaryRow>
                    <span>제품 합계</span>
                    <span>{orderSummary.total}원</span>
                </SummaryRow>
                <SummaryRow>
                    <span>배송료</span>
                    <span>{orderSummary.shipping}원</span>
                </SummaryRow>
                <SummaryRow>
                    <span>할인 금액</span>
                    <span>-{orderSummary.discount}원</span>
                </SummaryRow>
                <SummaryRow>
                    <strong>총 결제예정액</strong>
                    <strong>{orderSummary.totalDue}원</strong>
                </SummaryRow>
            </OrderSummary>

            <PaymentMethod>
                {/* 결제 방법 선택 UI */}
                <RadioGroup>
                    <RadioLabel>
                        <Input
                            type="radio"
                            name="paymentMethod"
                            value="transfer"
                            checked={paymentMethod === 'transfer'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setPaymentMethod(e.target.value)
                            }
                        />
                        무통장 입금
                    </RadioLabel>
                </RadioGroup>
                <RadioGroup>
                    <RadioLabel>
                        <Input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={paymentMethod === 'card'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setPaymentMethod(e.target.value)
                            }
                        />
                        카드 결제
                    </RadioLabel>
                </RadioGroup>
                <RadioGroup>
                    <RadioLabel>
                        <Input
                            type="radio"
                            name="paymentMethod"
                            value="accountTransfer"
                            checked={paymentMethod === 'accountTransfer'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setPaymentMethod(e.target.value)
                            }
                        />
                        계좌 이체
                    </RadioLabel>
                </RadioGroup>
            </PaymentMethod>

            <AgreementSection>
                {/* 주문자 동의 항목 */}
                <CheckboxLabel>
                    <AgreementCheckbox
                        type="checkbox"
                        checked={agreement}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setAgreement(e.target.checked)
                        }
                    />
                    <AgreementText>
                        구매 진행에 필요한 약관 및 개인정보 수집 이용에
                        동의합니다.
                    </AgreementText>
                </CheckboxLabel>
            </AgreementSection>

            <ButtonGroup>
                <Button onClick={handlePlaceOrder}>주문하기</Button>
                <Button onClick={handleCancelOrder}>주문 취소</Button>
            </ButtonGroup>
        </CheckoutContainer>
    );
};

export default CheckoutPage;
