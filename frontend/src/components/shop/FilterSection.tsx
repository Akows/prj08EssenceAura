import React from 'react';
import styled from 'styled-components';

interface FilterSectionProps {
    priceFrom: string;
    setPriceFrom: React.Dispatch<React.SetStateAction<string>>;
    priceTo: string;
    setPriceTo: React.Dispatch<React.SetStateAction<string>>;
    handlePriceFilter: () => void;
}

// 스타일 컴포넌트 정의
const FilterSectionContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        // 모바일 화면 크기에 따른 스타일 변경
        flex-direction: column; // 모바일에서는 세로 정렬
        align-items: center; // 세로 정렬 시 중앙 정렬
    }
`;

const PriceInput = styled.input`
    padding: 5px 10px;
    margin: 0 10px;
    border: 1px solid #ddd;

    @media (max-width: 768px) {
        // 모바일 화면 크기에 따른 스타일 변경
        width: 80%; // 모바일 환경에서 입력 필드 너비 조정
        margin: 5px 0; // 모바일에서는 상하 마진만 적용
    }
`;

const FilterButton = styled.button`
    padding: 5px 10px;
    background: #007bff;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
        background: #0056b3;
    }

    @media (max-width: 768px) {
        // 모바일 화면 크기에 따른 스타일 변경
        width: 80%; // 모바일 환경에서 버튼 너비 조정
        margin-top: 10px; // 버튼 위의 마진 추가
    }
`;

const FilterSection: React.FC<FilterSectionProps> = ({
    priceFrom,
    setPriceFrom,
    priceTo,
    setPriceTo,
    handlePriceFilter,
}) => {
    return (
        <FilterSectionContainer>
            <PriceInput
                type="number"
                placeholder="최소 가격"
                value={priceFrom}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPriceFrom(e.target.value)
                }
            />
            <PriceInput
                type="number"
                placeholder="최대 가격"
                value={priceTo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPriceTo(e.target.value)
                }
            />
            <FilterButton onClick={handlePriceFilter}>검색</FilterButton>
        </FilterSectionContainer>
    );
};

export default FilterSection;
