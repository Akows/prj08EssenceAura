import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdMenu } from 'react-icons/md';
import useLogout from '../../hooks/auth/useLogout';
import LoadingModal from './LoadingModal';
import { fetchSearchSuggestions } from '../../redux/product/productThunks';
import { debounce } from '../../utils/debounce';
import SearchBar from './SearchBar';
import DropdownMenu from './DropdownMenu';
import UserActions from './UserActions';
import UserActionsMobile from './UserActionsMobile';

const NavBarContainer = styled.div`
    position: relative; // DropdownContent를 absolute 위치로 조정하기 위한 기준점
`;

const LeftContainer = styled.div`
    display: flex;
    align-items: center;
`;

const NavBar = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #f8f9fa;

    @media (max-width: 768px) {
        justify-content: space-between;
    }
`;

const LogoButton = styled(Link)`
    font-size: 24px;
    color: black;
    text-decoration: none;
    &:hover {
        color: #007bff;
    }
`;

const DropdownContent = styled.div`
    display: ${(props) => (props.isOpen ? 'block' : 'none')};
    position: absolute;
    background-color: white; // 배경색 변경
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); // 그림자 효과 수정
    z-index: 1;
    min-width: 250px; // 최소 너비 설정
    border-radius: 4px; // 둥근 모서리
    /* overflow: hidden; // 내부 요소가 넘치지 않도록 설정 */

    top: 100%; // 상위 버튼 바로 아래 위치
    left: 10%; // 중앙 정렬을 위해 수정
    transform: translateX(-50%); // 중앙 정렬을 위해 X축으로 -50% 이동
`;

const SearchBarContainer = styled.div`
    display: flex;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    flex-grow: 0.5; // 너비를 2배로 확장

    @media (max-width: ${import.meta.env.VITE_MOBILE_SIZE}) {
        display: none; // 모바일 뷰에서는 검색창 숨김
    }
`;

const RightContainer = styled.div`
    display: flex;
    align-items: center;
`;

const MobileMenuButton = styled.button`
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;

    @media (max-width: 768px) {
        display: block;
    }
`;

const MobileDropdownContent = styled(DropdownContent)`
    display: none;
    @media (max-width: 768px) {
        display: flex;
        width: 95%;
        flex-direction: column; // 항목들을 세로로 정렬
        padding: 0;
        top: 55px; // 메뉴바 높이 조정
        left: 50%; // 화면의 가운데에 위치하도록 조정
        transform: translateX(-50%); // left 값을 기준으로 중앙 정렬
    }
`;

const MobileSearchBarContainer = styled(SearchBarContainer)`
    @media (max-width: ${import.meta.env.VITE_MOBILE_SIZE}) {
        display: flex; // 모바일 뷰에서 검색창 표시
        width: 100%; // 전체 너비를 사용
        overflow: visible; // 부모 컴포넌트에서 overflow를 visible로 설정
    }
`;

const UpperNavigation: React.FC = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState<
        Array<{ type: string; value: string }>
    >([]);
    const [hasSuggestions, setHasSuggestions] = useState(false);
    const [debouncedSearchKeyword, setDebouncedSearchKeyword] = useState('');
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const isAdmin = useSelector((state) => state.auth.userInfo?.isAdmin);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, handleLogout } = useLogout(); // 로그아웃 훅 사용

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

    const toggleDropdown = () => {
        setIsMobileMenuOpen(false);
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleMobileMenu = () => {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
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

    return (
        <>
            <NavBarContainer>
                <NavBar>
                    <LeftContainer>
                        <LogoButton to="/shop">EssenceAura</LogoButton>

                        <DropdownMenu
                            isOpen={isDropdownOpen}
                            toggleDropdown={toggleDropdown}
                        />
                    </LeftContainer>

                    <SearchBarContainer>
                        <SearchBar
                            searchKeyword={searchKeyword}
                            setSearchKeyword={setSearchKeyword}
                            handleSearch={handleSearch}
                            showSuggestions={showSuggestions}
                            setShowSuggestions={setShowSuggestions}
                            hasSuggestions={hasSuggestions}
                            suggestions={suggestions}
                            onSuggestionClick={onSuggestionClick}
                            keywordClearHandler={keywordClearHandler}
                        />
                    </SearchBarContainer>

                    <RightContainer>
                        <UserActions
                            isLoggedIn={isLoggedIn}
                            isAdmin={isAdmin}
                            handleLogout={handleLogout}
                        />
                    </RightContainer>

                    <MobileMenuButton onClick={toggleMobileMenu}>
                        <MdMenu />
                    </MobileMenuButton>

                    {isMobileMenuOpen && (
                        <MobileDropdownContent>
                            {/* 모바일 환경에서의 드롭다운 메뉴 항목 */}
                            <MobileSearchBarContainer>
                                <SearchBar
                                    searchKeyword={searchKeyword}
                                    setSearchKeyword={setSearchKeyword}
                                    handleSearch={handleSearch}
                                    showSuggestions={showSuggestions}
                                    setShowSuggestions={setShowSuggestions}
                                    hasSuggestions={hasSuggestions}
                                    suggestions={suggestions}
                                    onSuggestionClick={onSuggestionClick}
                                    keywordClearHandler={keywordClearHandler}
                                />
                            </MobileSearchBarContainer>

                            <UserActionsMobile
                                isLoggedIn={isLoggedIn}
                                isAdmin={isAdmin}
                                handleLogout={handleLogout}
                                closeMobileMenu={closeMobileMenu}
                            />
                        </MobileDropdownContent>
                    )}
                </NavBar>
            </NavBarContainer>

            {isLoading && <LoadingModal />}
        </>
    );
};

export default UpperNavigation;
