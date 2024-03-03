import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchSearchSuggestions } from '../../redux/product/productThunks';
import { debounce } from '../../utils/debounce';

const useSearchBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchKeyword, setSearchKeyword] = useState('');
    const [suggestions, setSuggestions] = useState<
        Array<{ type: string; value: string }>
    >([]);
    const [hasSuggestions, setHasSuggestions] = useState(false);
    const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleSearch = () => {
        if (!searchKeyword) {
            alert('검색어를 입력해주세요.');
            return;
        }

        navigate(`/shoplist?name=${encodeURIComponent(searchKeyword)}`);
    };

    const onSuggestionClick = (suggestion, type) => {
        let param;
        switch (type) {
            case 'name':
                param = `name=${encodeURIComponent(suggestion)}`;
                break;
            case 'category':
                param = `category=${encodeURIComponent(suggestion)}`;
                break;
            case 'tag':
                param = `tag=${encodeURIComponent(suggestion)}`;
                break;
            case 'event':
                param = `event=${encodeURIComponent(suggestion)}`;
                break;
            default:
                param = `name=${encodeURIComponent(suggestion)}`;
        }
        navigate(`/shoplist?${param}`);
    };

    // debounce를 적용한 검색 함수
    const debouncedSearch = useCallback(
        debounce((keyword) => {
            setDebouncedSearchKeyword(keyword);
        }, 2000), // 2000ms의 지연시간을 적용
        [] // 이 함수는 컴포넌트의 라이프사이클에서 한 번만 생성됩니다.
    );

    const keywordClearHandler = () => {
        setSearchKeyword('');
        setSuggestions([]);
        setShowSuggestions(false);
    };

    useEffect(() => {
        // 사용자가 입력 중이면 debounce 함수를 호출
        if (searchKeyword) {
            debouncedSearch(searchKeyword);
        } else {
            // 사용자가 입력을 모두 지웠으면 추천 검색어 목록을 초기화
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [searchKeyword, debouncedSearch]);

    // 검색 제안을 가져오는 함수
    useEffect(() => {
        if (debouncedSearchKeyword) {
            dispatch(fetchSearchSuggestions(debouncedSearchKeyword))
                .then((response) => {
                    if (response.payload.length > 0) {
                        setSuggestions(response.payload);
                        setHasSuggestions(true);
                    } else {
                        setSuggestions([]);
                        setHasSuggestions(false);
                    }
                    setShowSuggestions(true);
                })
                .catch((error) => {
                    console.error(error);
                    setHasSuggestions(false);
                });
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
            setHasSuggestions(false);
        }
    }, [debouncedSearchKeyword, dispatch]);

    return {
        searchKeyword,
        setSearchKeyword,
        suggestions,
        hasSuggestions,
        showSuggestions,
        setShowSuggestions,
        handleSearch,
        onSuggestionClick,
        keywordClearHandler,
    };
};

export default useSearchBar;
