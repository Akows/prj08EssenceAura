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
`;

const PriceInput = styled.input`
    padding: 5px 10px;
    margin: 0 10px;
    border: 1px solid #ddd;
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
