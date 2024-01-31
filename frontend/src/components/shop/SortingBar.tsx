import React from 'react';
import styled from 'styled-components';
import { SortOption } from '../../type/shoptypes';

interface SortingBarProps {
    currentSort: SortOption;
    handleSortChange: (sortOption: SortOption) => void;
    itemsPerPage: number;
    handleItemsPerPageChange: (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => void;
}

// 스타일 컴포넌트 정의
const SortingBarContainer = styled.div`
    display: flex;
    justify-content: flex-end; // 정렬 옵션을 오른쪽에 붙임
    margin-bottom: 20px;
    width: 100%;
`;

const SortButton = styled.button`
    padding: 5px 10px;
    margin-left: 10px;
    border: 1px solid #ddd;
    background: transparent;
    cursor: pointer;

    &:hover {
        background: #f0f0f0;
    }

    &.active {
        border-color: #000;
        font-weight: bold;
    }
`;

const DropdownSelect = styled.select`
    padding: 5px 10px;
    margin-left: 10px;
    border: 1px solid #ddd;
    background: white;
    cursor: pointer;

    &:hover {
        background: #f0f0f0;
    }
`;

const SortingBar: React.FC<SortingBarProps> = ({
    currentSort,
    handleSortChange,
    itemsPerPage,
    handleItemsPerPageChange,
}) => {
    return (
        <SortingBarContainer>
            <SortButton
                className={currentSort === 'created_at_asc' ? 'active' : ''}
                onClick={() => handleSortChange('created_at_asc')}
            >
                등록일 오름차순
            </SortButton>

            <SortButton
                className={currentSort === 'created_at_desc' ? 'active' : ''}
                onClick={() => handleSortChange('created_at_desc')}
            >
                등록일 내림차순
            </SortButton>

            <SortButton
                className={currentSort === 'price_asc' ? 'active' : ''}
                onClick={() => handleSortChange('price_asc')}
            >
                가격 낮은순
            </SortButton>
            <SortButton
                className={currentSort === 'price_desc' ? 'active' : ''}
                onClick={() => handleSortChange('price_desc')}
            >
                가격 높은순
            </SortButton>
            <SortButton
                className={currentSort === 'discount_rate_asc' ? 'active' : ''}
                onClick={() => handleSortChange('discount_rate_asc')}
            >
                할인율 낮은순
            </SortButton>
            <SortButton
                className={currentSort === 'discount_rate_desc' ? 'active' : ''}
                onClick={() => handleSortChange('discount_rate_desc')}
            >
                할인율 높은순
            </SortButton>
            <SortButton
                className={currentSort === 'stock_asc' ? 'active' : ''}
                onClick={() => handleSortChange('stock_asc')}
            >
                재고 많은순
            </SortButton>
            <SortButton
                className={currentSort === 'stock_desc' ? 'active' : ''}
                onClick={() => handleSortChange('stock_desc')}
            >
                재고 적은순
            </SortButton>

            {/* 페이지당 상품 표시 개수 선택 드롭다운 */}
            <DropdownSelect
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
            >
                <option value="20">20개 표시</option>
                <option value="32">32개 표시</option>
                <option value="46">46개 표시</option>
            </DropdownSelect>
        </SortingBarContainer>
    );
};

export default SortingBar;
