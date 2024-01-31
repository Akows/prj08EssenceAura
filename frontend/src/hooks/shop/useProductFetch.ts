import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchProducts } from '../../redux/product/productThunks';
import { SortOption } from '../../type/shoptypes';

interface UseProductFetchParams {
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    currentSort: SortOption;
    page: number;
    itemsPerPage: number;
    priceFrom: string;
    priceTo: string;
    setPriceTo: React.Dispatch<React.SetStateAction<string>>;
    setPriceFrom: React.Dispatch<React.SetStateAction<string>>;
    filterButtonClicked: boolean;
    setFilterButtonClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const useProductFetch = ({
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
}: UseProductFetchParams) => {
    const dispatch = useDispatch();
    const location = useLocation();

    // URL 변경 시 데이터 로딩
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const filterParams: { [key: string]: string | number } = {
            sort: currentSort,
            page,
            limit: itemsPerPage,
            priceFrom: 0,
            priceTo: 1000000,
        };

        ['title', 'name', 'category', 'tag', 'event'].forEach((param) => {
            const value = searchParams.get(param);
            if (value) {
                setTitle(value);
                filterParams[param] = value;
            }
        });

        setPriceTo('');
        setPriceFrom('');
        dispatch(fetchProducts(filterParams));
    }, [location, currentSort, page, itemsPerPage, dispatch]);

    // 필터 버튼 클릭 시 데이터 로딩
    useEffect(() => {
        if (filterButtonClicked) {
            const searchParams = new URLSearchParams(location.search);
            const filterParams: { [key: string]: string | number } = {
                sort: currentSort,
                page,
                limit: itemsPerPage,
                priceFrom: priceFrom || 0,
                priceTo: priceTo || 1000000,
            };

            ['name', 'category', 'tag', 'event'].forEach((param) => {
                const value = searchParams.get(param);
                if (value) {
                    filterParams[param] = value;
                }
            });

            dispatch(fetchProducts(filterParams));
            setFilterButtonClicked(false); // 데이터 로딩 후 상태 재설정
        }
    }, [
        filterButtonClicked,
        currentSort,
        page,
        itemsPerPage,
        priceFrom,
        priceTo,
        dispatch,
        setFilterButtonClicked,
    ]);
};

export default useProductFetch;
