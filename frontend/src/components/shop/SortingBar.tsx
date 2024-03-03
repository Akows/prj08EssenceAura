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

const SortingBarContainer = styled.div`
    display: flex;
    flex-wrap: wrap; // 컨테이너가 충분한 너비를 갖지 못할 때 아이템을 다음 줄로 넘김
    justify-content: center; // 버튼들을 컨테이너 중앙에 배치
    align-items: center; // 버튼들을 세로축 중앙에 배치
    margin-bottom: 20px;
    width: 100%;

    @media (max-width: ${import.meta.env.VITE_MOBILE_SIZE}) {
        justify-content: center;
    }
`;

const SortButton = styled.button`
    padding: 8px 12px; // 버튼 패딩을 늘려 클릭 영역을 크게 함
    margin: 5px; // 버튼 사이의 간격을 설정
    border: 1px solid #ddd;
    background: transparent;
    cursor: pointer;
    flex: 1 1 auto; // 모든 버튼이 유연하게 너비를 차지하도록 함
    text-align: center; // 버튼 내 텍스트 중앙 정렬

    &:hover {
        background: #f0f0f0;
    }

    &.active {
        border-color: #000;
        font-weight: bold;
    }

    @media (max-width: ${import.meta.env.VITE_MOBILE_SIZE}) {
        flex-basis: calc(
            50% - 10px
        ); // 버튼 기본 너비를 조정하여 반응형으로 만듦
        margin: 5px; // 모바일에서도 버튼 간 간격을 유지
        padding: 10px 0; // 상하 패딩을 늘려 클릭 가능 영역을 더 크게 함
        font-size: 0.8rem; // 모바일 화면에서 글자 크기를 조정
    }
`;

const DropdownSelect = styled.select`
    padding: 8px 12px;
    margin: 5px;
    border: 1px solid #ddd;
    background: white;
    cursor: pointer;

    @media (max-width: ${import.meta.env.VITE_MOBILE_SIZE}) {
        flex-basis: 100%; // 드롭다운이 모바일에서 전체 너비를 차지하도록 함
        margin: 5px 0; // 드롭다운 위아래에 마진 추가
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
            {/* <SortButton
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
            </SortButton> */}

            <SortButton
                className={currentSort === 'final_price_asc' ? 'active' : ''}
                onClick={() => handleSortChange('final_price_asc')}
            >
                가격 낮은순
            </SortButton>
            <SortButton
                className={currentSort === 'final_price_desc' ? 'active' : ''}
                onClick={() => handleSortChange('final_price_desc')}
            >
                가격 높은순
            </SortButton>
            <SortButton
                className={currentSort === 'discount_rate_desc' ? 'active' : ''}
                onClick={() => handleSortChange('discount_rate_desc')}
            >
                할인율 높은순
            </SortButton>
            <SortButton
                className={currentSort === 'discount_rate_asc' ? 'active' : ''}
                onClick={() => handleSortChange('discount_rate_asc')}
            >
                할인율 낮은순
            </SortButton>
            <SortButton
                className={currentSort === 'reviews_asc' ? 'active' : ''}
                onClick={() => handleSortChange('reviews_asc')}
            >
                리뷰 많은순
            </SortButton>
            <SortButton
                className={currentSort === 'reviews_desc' ? 'active' : ''}
                onClick={() => handleSortChange('reviews_desc')}
            >
                리뷰 적은순
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
