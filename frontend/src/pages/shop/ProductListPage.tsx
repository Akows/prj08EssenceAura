import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import AlertConfirmModal from '../../components/common/AlertConfirmModal';
import LoadingModal from '../../components/common/LoadingModal';
import Pagination from '../../components/common/Pagination';
import ProductCard from '../../components/shop/ProductCard';
import { fetchProducts } from '../../redux/product/productThunks';

// 정렬 옵션 타입
type SortOption =
    | 'created_at_asc'
    | 'created_at_desc'
    | 'price_asc'
    | 'price_desc'
    | 'discount_rate_asc'
    | 'discount_rate_desc'
    | 'stock_asc'
    | 'stock_desc';

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

const SortingBar = styled.div`
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

const ProductListPage: React.FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const { products, loading, error, totalPages } = useSelector((state) => ({
        ...state.product,
        totalPages: state.product.totalPages,
    }));

    // const { products, loading, error } = useSelector((state) => state.product);
    const [currentSort, setCurrentSort] =
        useState<SortOption>('created_at_asc');
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(20);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // 상품 데이터 불러오기
    useEffect(() => {
        // URL에서 쿼리 파라미터 분석
        const searchParams = new URLSearchParams(location.search);
        const filterParams = {
            sort: currentSort,
            page,
            limit: itemsPerPage,
        };

        // URL 쿼리에 따른 필터링 파라미터 설정
        const name = searchParams.get('name');
        if (name) {
            filterParams.name = name;
        }

        const category = searchParams.get('category');
        if (category) {
            filterParams.category = category;
        }

        const tags = searchParams.get('tags');
        if (tags) {
            filterParams.tags = tags;
        }

        const event = searchParams.get('event');
        if (event) {
            filterParams.event = event;
        }

        // 필터링된 상품 목록 불러오기
        dispatch(fetchProducts(filterParams));
    }, [location.search, currentSort, page, itemsPerPage, dispatch]);

    // 인피니티 스크롤 구현
    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 0.5 }
        );

        const target = document.getElementById('page-end');
        if (target) {
            observerRef.current.observe(target);
        }

        return () => {
            if (target && observerRef.current) {
                observerRef.current.unobserve(target);
            }
        };
    }, []);

    // 정렬 변경 핸들러
    const handleSortChange = (sortOption: SortOption) => {
        setCurrentSort(sortOption);
        setPage(1); // 페이지를 1로 설정
        dispatch(
            fetchProducts({ sort: sortOption, page: 1, limit: itemsPerPage })
        ); // itemsPerPage 전달
    };

    // 페이지당 상품 표시 개수 변경 핸들러
    const handleItemsPerPageChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setItemsPerPage(Number(event.target.value));
        setPage(1);
        dispatch(
            fetchProducts({
                sort: currentSort,
                page: 1,
                limit: Number(event.target.value),
            })
        );
    };

    // 페이지 번호 변경 핸들러
    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber);
        dispatch(
            fetchProducts({
                sort: currentSort,
                page: pageNumber,
                limit: itemsPerPage,
            })
        );
    };

    if (loading) {
        return <LoadingModal />;
    }

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
                <SortingBar>
                    <SortButton
                        className={
                            currentSort === 'created_at_asc' ? 'active' : ''
                        }
                        onClick={() => handleSortChange('created_at_asc')}
                    >
                        등록일 오름차순
                    </SortButton>
                    <SortButton
                        className={
                            currentSort === 'created_at_desc' ? 'active' : ''
                        }
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
                        className={
                            currentSort === 'discount_rate_asc' ? 'active' : ''
                        }
                        onClick={() => handleSortChange('discount_rate_asc')}
                    >
                        할인율 낮은순
                    </SortButton>
                    <SortButton
                        className={
                            currentSort === 'discount_rate_desc' ? 'active' : ''
                        }
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
                </SortingBar>

                {/* 상품 리스트 제목 */}
                <ProductListTitle>전체 상품</ProductListTitle>

                {/* 상품 그리드 */}
                <ProductGrid>
                    {products.map((product) => (
                        <ProductCard
                            key={product.productId}
                            productId={product.productId}
                            imageUrl={product.imageUrl}
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
            <div id="page-end" /> {/* 인피니티 스크롤을 위한 페이지 끝 요소 */}
        </ProductListContainer>
    );
};

export default ProductListPage;
