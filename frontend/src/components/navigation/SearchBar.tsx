import React, { useState } from 'react';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';
import useSearchBar from '../../hooks/navigation/useSearchBar';

const SearchInput = styled.input`
    border: none;
    padding: 10px;
    flex-grow: 1;
`;

const SearchButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

const SearchSuggestionsContainer = styled.div`
    display: ${(props) => (props.show ? 'block' : 'none')};
    position: absolute;
    top: 100%; // 기존 위치 유지
    left: 30%; // 중앙 정렬을 위해 수정
    right: 25%; // 중앙 정렬을 위해 수정
    background-color: white;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 0 0 4px 4px;
    overflow-y: auto; // 내용이 넘칠 경우 세로 스크롤바 생성
    max-height: 300px; // 최대 높이 설정
    z-index: 10;
    width: 50%; // 너비를 50%로 설정

    @media (max-width: 768px) {
        top: 38px;
        left: 0; // 모바일 화면에서는 기존 설정 유지
        right: 0; // 모바일 화면에서는 기존 설정 유지
        width: 100%; // 모바일 화면에서는 전체 너비 사용
    }
`;

const SuggestionItem = styled.div`
    padding: 10px;
    border-bottom: 1px solid #ddd;
    &:hover {
        background-color: #f2f2f2;
    }
    &:last-child {
        border-bottom: none;
    }
`;

const ClearButton = styled.button`
    cursor: pointer;
    background: none;
    border: none;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        color: #007bff;
    }
`;

const SearchBar: React.FC = () => {
    const {
        searchKeyword,
        setSearchKeyword,
        suggestions,
        hasSuggestions,
        showSuggestions,
        setShowSuggestions,
        handleSearch,
        onSuggestionClick,
        keywordClearHandler,
    } = useSearchBar();

    const [isSuggestionFocused, setIsSuggestionFocused] = useState(false);

    const onBlurHandler = () => {
        // 제안 목록을 숨기기 전에 충분한 지연 시간을 설정
        setTimeout(() => {
            if (!isSuggestionFocused) {
                setShowSuggestions(false);
            }
        }, 100); // 100ms 지연
    };

    return (
        <>
            <SearchInput
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => onBlurHandler(false)}
                onMouseEnter={() => setIsSuggestionFocused(true)}
                onMouseLeave={() => setIsSuggestionFocused(false)}
                placeholder="검색어 입력"
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
            />
            <ClearButton onClick={keywordClearHandler}>X</ClearButton>
            <SearchButton onClick={handleSearch}>
                <MdSearch />
            </SearchButton>

            <SearchSuggestionsContainer show={showSuggestions}>
                {hasSuggestions
                    ? suggestions.map((suggestion, index) => (
                          <SuggestionItem
                              key={`${suggestion.type}-${index}`}
                              onClick={() =>
                                onSuggestionClick(
                                    suggestion.value,
                                    suggestion.type
                                )
                            }
                        >
                            {suggestion.value}
                        </SuggestionItem>
                      ))
                    : showSuggestions && (
                          <SuggestionItem>
                            검색 결과가 존재하지 않습니다.
                        </SuggestionItem>
                    )}
            </SearchSuggestionsContainer>
        </>
    );
};

export default SearchBar;
