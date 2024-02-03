import { forwardRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// 제품 카드 컴포넌트의 props 타입 정의
interface ProductCardProps {
    product_Id: number;
    image_url: string;
    title: string;
    price: string;
    discount_rate: string;
    final_price: string;
}

// 제품 카드를 위한 스타일 컴포넌트
const Card = styled.div`
    border: 1px solid #ddd; // 경계선 스타일
    border-radius: 8px; // 테두리 둥글기
    overflow: hidden; // 이미지가 테두리를 넘치지 않도록
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); // 그림자 효과
    transition: transform 0.2s; // 호버 시 변환 효과

    &:hover {
        transform: translateY(-5px); // 호버 시 약간 위로 올라가는 효과
    }
`;

const CardImage = styled.img`
    width: 100%;
    height: 200px; // 고정 높이
    object-fit: cover; // 이미지 비율 유지
`;

const CardBody = styled.div`
    padding: 15px;
    text-align: center; // 텍스트 중앙 정렬
`;

const CardTitle = styled.h3`
    margin: 0;
    color: #333; // 제목 색상
    font-size: 1.2em; // 제목 크기
`;

const CardPrice = styled.p`
    color: #666; // 기존 가격 색상
    text-decoration: line-through; // 가격 위에 줄
    opacity: 0.6; // 투명도 조절
    margin-bottom: 0; // 아래 가격과의 마진
`;

const CardDiscountedPrice = styled.p`
    color: #333; // 할인된 가격 색상
    font-size: 1.2em; // 할인된 가격 크기
    font-weight: bold; // 글자 두께
    margin-top: 0; // 위 가격과의 마진
`;

const CardDiscountRate = styled.span`
    color: #ff6b6b; // 옅은 붉은 색
    font-size: 0.9em; // 글자 크기 축소
`;

const CardPriceWrapper = styled.div`
    position: relative; // 위치 조정을 위해 relative 설정
    height: 60px; // 할인률이 없을 때도 높이를 유지하기 위해 설정
    display: flex;
    flex-direction: column;
    justify-content: center; // 가격을 중앙에 위치시킵니다.
`;

const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(
    (
        { product_Id, image_url, title, price, discount_rate, final_price },
        ref
    ) => {
        const navigate = useNavigate();

        const handleItemClick = () => {
            navigate(`/shopdetail/${product_Id}`);
        };

        const discountRate = parseFloat(discount_rate);
        const displayDiscountRate = discountRate.toFixed(0); // 소수점 없는 할인률

        return (
            <Card onClick={handleItemClick} ref={ref}>
                <CardImage src={image_url} alt={title} />
                <CardBody>
                    <CardTitle>{title}</CardTitle>
                    <CardPriceWrapper>
                        {discountRate > 0 && ( // 할인율이 0보다 클 때만 기존 가격 표시
                            <CardPrice>{Math.round(Number(price))}원</CardPrice>
                        )}
                        <CardDiscountedPrice>
                            {Math.round(Number(final_price))}원
                            {discountRate > 0 && ( // 할인율이 0보다 클 때만 할인률 표시
                                <CardDiscountRate>
                                    {' '}
                                    -{displayDiscountRate}%
                                </CardDiscountRate>
                            )}
                        </CardDiscountedPrice>
                    </CardPriceWrapper>
                </CardBody>
            </Card>
        );
    }
);

// Component definition is missing display name 타입 에러 해결 방법.
// Display name은 React 개발자 도구에서 컴포넌트를 더 쉽게 식별할 수 있도록 도와주는 이름.
// forwardRef 사용시 컴포넌트에 명시적으로 이름을 할당하여 타입 에러를 해결할 수 있다.
ProductCard.displayName = 'ProductCard';

export default ProductCard;
