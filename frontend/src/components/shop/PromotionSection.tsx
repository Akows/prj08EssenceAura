import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PromotionContainer = styled.section`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px; // 각 프로모션 항목 사이의 간격
    margin: 40px 0; // 상하 여백
`;

const PromotionItem = styled.div`
    width: 300px; // 각 프로모션 항목의 너비
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); // 그림자 효과
    text-align: center; // 텍스트 중앙 정렬
    padding: 20px;
    background: #fff; // 배경색

    img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }

    h3 {
        margin: 10px 0;
    }
`;

const promotions = [
    {
        id: 1,
        title: 'Happy New Year Event',
        imageUrl: '/path/to/promotion1.jpg',
        description: '새해맞이 할인 이벤트 진행 중!',
    },
    {
        id: 2,
        title: 'Winter Event',
        imageUrl: '/path/to/promotion1.jpg',
        description: '연말 할인 이벤트 진행 중!',
    },
    // ... 여기에 다른 프로모션 항목 추가
];

const PromotionSection: React.FC = () => {
    const navigate = useNavigate();

    const handlePromotionClick = () => {
        // 'shoplist' 경로로 이동합니다.
        navigate('/shoplist');
    };

    return (
        <PromotionContainer>
            {promotions.map((promo) => (
                <PromotionItem key={promo.id} onClick={handlePromotionClick}>
                    <img src={promo.imageUrl} alt={promo.title} />
                    <h3>{promo.title}</h3>
                    <p>{promo.description}</p>
                    <Link to="/shoplist">자세히 보기</Link>
                    {/* 필요한 경우 여기에 버튼 추가 */}
                </PromotionItem>
            ))}
        </PromotionContainer>
    );
};

export default PromotionSection;
