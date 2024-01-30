import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
    color: #666; // 가격 색상
`;

// 제품 카드 컴포넌트의 props 타입 정의
interface ProductCardProps {
    productId: number;
    imageUrl: string;
    title: string;
    price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
    productId,
    imageUrl,
    title,
    price,
}) => {
    const navigate = useNavigate();

    const handleItemClick = () => {
        navigate(`/shopdetail?${productId}`); // 제품 ID를 URL에 포함
    };

    return (
        <Card onClick={handleItemClick}>
            <CardImage src={imageUrl} alt={title} />
            <CardBody>
                <CardTitle>{title}</CardTitle>
                <CardPrice>{price}</CardPrice>
            </CardBody>
        </Card>
    );
};

export default ProductCard;
