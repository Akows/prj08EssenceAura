import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AlertConfirmModal from '../../components/common/AlertConfirmModal';
import LoadingModal from '../../components/common/LoadingModal';
import Pagination from '../../components/common/Pagination';
import FilterSection from '../../components/shop/FilterSection';
import ProductCard from '../../components/shop/ProductCard';
import SortingBar from '../../components/shop/SortingBar';
import useProductFetch from '../../hooks/shop/useProductFetch';
import { SortOption } from '../../type/shoptypes';

const ProductListContainer = styled.div`
    max-width: 1240px; // 컨테이너 최대 너비를 설정하여 큰 화면에서도 적절한 크기를 유지
    width: 90%; // 전체 너비의 90%를 사용
    margin: 40px auto; // 상하 마진은 0, 좌우 마진은 자동으로 설정하여 중앙 정렬
    display: flex; // 수평 레이아웃을 위한 flex 설정
    padding: 40px;
    background: #f8f8f8;
    justify-content: space-between; // 컨테이너 내의 아이템 간격을 균등하게 분배
    @media (max-width: 1024px) {
        flex-direction: column; // 모바일 뷰에서는 컬럼 방향으로 변경
    }
`;

const MainContent = styled.main`
    width: 100%; // main 태그의 너비를 100%로 설정
    display: flex; // flexbox 레이아웃 사용
    flex-direction: column; // 자식 요소를 세로로 쌓음
    align-items: center; // 가로축에서 중앙 정렬
`;

const ProductListTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
`;

const ProductGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-left: 40px; // Sidebar와의 간격 추가
    @media (max-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
        margin-left: 0; // 모바일 뷰에서는 간격을 제거
    }
`;

const ProductListPage: React.FC = () => {
    // 상태 관리
    const { products, loading, error, totalPages } = useSelector((state) => ({
        ...state.product,
        totalPages: state.product.totalPages,
    }));
    const [title, setTitle] = useState('전체상품');
    const [currentSort, setCurrentSort] =
        useState<SortOption>('created_at_asc');
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const [priceFrom, setPriceFrom] = useState('');
    const [priceTo, setPriceTo] = useState('');
    const [filterButtonClicked, setFilterButtonClicked] = useState(false);

    // 가격 필터링 핸들러
    const handlePriceFilter = () => {
        setPage(1);
        setFilterButtonClicked(true); // 필터 버튼 클릭 상태 설정
    };

    // 정렬 변경 핸들러
    const handleSortChange = (sortOption: SortOption) => {
        setCurrentSort(sortOption);
        setPage(1);
    };

    // 페이지당 상품 표시 개수 변경 핸들러
    const handleItemsPerPageChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setItemsPerPage(Number(event.target.value));
        setPage(1);
    };

    // 페이지 번호 변경 핸들러
    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber);
    };

    // 상품 데이터 불러오기 (커스텀 훅 사용)
    useProductFetch({
        setTitle,
        currentSort,
        page,
        itemsPerPage,
        priceFrom,
        priceTo,
        setPriceTo,
        setPriceFrom,
        filterButtonClicked,
        setFilterButtonClicked,
    });

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
        <ProductListContainer>
            <MainContent>
                {/* 정렬 옵션 바 */}
                <SortingBar
                    currentSort={currentSort}
                    handleSortChange={handleSortChange}
                    itemsPerPage={itemsPerPage}
                    handleItemsPerPageChange={handleItemsPerPageChange}
                />

                {/* 가격 필터링 옵션 바 */}
                <FilterSection
                    priceFrom={priceFrom}
                    setPriceFrom={setPriceFrom}
                    priceTo={priceTo}
                    setPriceTo={setPriceTo}
                    handlePriceFilter={handlePriceFilter}
                />

                {/* 상품 리스트 제목 */}
                <ProductListTitle>{title}</ProductListTitle>

                {/* 상품 그리드 */}
                <ProductGrid>
                    {products.map((product) => (
                        <ProductCard
                            key={product.product_Id}
                            product_Id={product.product_id}
                            image_Url={product.image_Url}
                            title={product.name}
                            price={`${product.price}`}
                        />
                    ))}
                </ProductGrid>

                {/* 페이지네이션 컴포넌트 사용 */}
                <Pagination
                    totalPages={totalPages}
                    currentPage={page}
                    onPageChange={handlePageChange}
                />
            </MainContent>
        </ProductListContainer>
    );
};

export default ProductListPage;
