import React, { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdSearch, MdPerson, MdMenu, MdExitToApp } from 'react-icons/md';
import { FaShoppingCart } from 'react-icons/fa';
import useLogout from '../../hooks/auth/useLogout';
import LoadingModal from './LoadingModal';
import { fetchSearchSuggestions } from '../../redux/product/productThunks';
import { debounce } from '../../utils/debounce';

const mobileSize = '768px';

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

const Dropdown = styled.div`
    position: relative;
    display: inline-block;
    margin-left: 10px; // LogoButton으로부터 10px 오른쪽으로 이동
`;

const DropdownButton = styled.button`
    width: 120px;
    background: #f8f9fa;
    border: 1px solid #ddd; // 테두리 추가
    cursor: pointer;
    padding: 10px;
    margin-left: 20px;
    transition: background-color 0.3s ease; // 부드러운 배경 색상 변경 효과를 위해 추가

    &:hover {
        background-color: #e2e6ea; // 호버 시 배경 색상 변경
        border-color: #dae0e5; // 호버 시 테두리 색상 변경
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
    overflow: hidden; // 내부 요소가 넘치지 않도록 설정

    top: 100%; // 상위 버튼 바로 아래 위치
    left: 10%; // 중앙 정렬을 위해 수정
    transform: translateX(-50%); // 중앙 정렬을 위해 X축으로 -50% 이동

    /* ${Dropdown}:hover & {
        display: block; // 드롭다운 보이기
    } */
`;

const DropdownTitle = styled.div`
    font-size: 18px; // 대분류 항목의 글자 크기
    font-weight: bold; // 대분류 항목을 굵게
    text-decoration: underline; // 밑줄
    padding: 8px 16px; // 패딩
    background-color: #f8f9fa; // 배경색
    border-bottom: 1px solid #ddd; // 구분선
`;

const DropdownLink = styled(Link)`
    width: 100%;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    &:hover {
        background-color: #ddd;
    }
`;

const DropdownItem = styled(DropdownLink)`
    font-size: 16px; // 소분류 항목의 글자 크기
    padding: 8px 16px; // 패딩
    color: #333; // 글자색
    &:hover {
        background-color: #e2e6ea; // 호버 배경색
        color: #007bff; // 호버 글자색
    }
`;

const SearchBarContainer = styled.div`
    display: flex;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    flex-grow: 0.5; // 너비를 2배로 확장

    @media (max-width: ${mobileSize}) {
        display: none; // 모바일 뷰에서는 검색창 숨김
    }
`;

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

const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;

    @media (max-width: 768px) {
        display: none;
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

const RightContainer = styled.div`
    display: flex;
    align-items: center;
`;

const DropdownContentRight = styled(DropdownContent)`
    right: 0; // 드롭다운 메뉴를 오른쪽에 정렬합니다.
    top: 100%; // 버튼 바로 아래에 메뉴가 위치하도록 설정합니다.
`;

const DropdownSectionTitle = styled(DropdownTitle)`
    background-color: transparent; // 배경색을 투명하게 설정합니다.
    border-bottom: none; // 구분선을 제거합니다.
`;

const MobileMenuButton = styled(IconButton)`
    display: none;
    @media (max-width: 768px) {
        display: block;
    }
`;

const MobileDropdownContent = styled(DropdownContent)`
    display: none;
    @media (max-width: 768px) {
        display: flex;
        width: 98%;
        flex-direction: column; // 항목들을 세로로 정렬
        padding: 0;
        top: 55px; // 메뉴바 높이 조정
    }
`;

const MobileSearchBarContainer = styled(SearchBarContainer)`
    @media (max-width: ${mobileSize}) {
        display: flex; // 모바일 뷰에서 검색창 표시
        width: 100%; // 전체 너비를 사용
        margin-bottom: 1rem; // 다른 메뉴 항목과의 간격
    }
`;

const UserButtonContainer = styled.div`
    display: flex;
    align-items: center;
    margin-right: 10px;

    @media (max-width: ${mobileSize}) {
        width: 100%; // 모바일 뷰에서는 너비를 100%로 설정하여 버튼들이 가로로 정렬되도록 합니다.
        justify-content: space-evenly; // 버튼 사이에 균등 간격을 둡니다.
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

    const closeDropdown = () => {
        setIsDropdownOpen(false);
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

    const onBlurHandler = () => {
        // 사용자가 제안을 클릭할 시간을 주기 위해 약간의 지연을 줍니다.
        setTimeout(() => {
            setShowSuggestions(false);
        }, 200); // 200ms 지연
    };

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

                        <Dropdown>
                            <DropdownButton onClick={toggleDropdown}>
                                카테고리 보기
                            </DropdownButton>
                            <DropdownContent
                                isOpen={isDropdownOpen}
                                onClick={closeDropdown}
                            >
                                <DropdownTitle>전체상품</DropdownTitle>
                                <DropdownItem to="/shoplist?title=전체상품">
                                    전체상품보기
                                </DropdownItem>
                                <DropdownTitle>카테고리</DropdownTitle>
                                <DropdownItem to="/shoplist?category=여성향수">
                                    여성향수
                                </DropdownItem>
                                <DropdownItem to="/shoplist?category=남성향수">
                                    남성향수
                                </DropdownItem>
                                <DropdownItem to="/shoplist?category=남녀공용">
                                    남녀공용
                                </DropdownItem>
                                <DropdownTitle>태그</DropdownTitle>
                                <DropdownItem to="/shoplist?tag=플로랄">
                                    플로랄
                                </DropdownItem>
                                <DropdownItem to="/shoplist?tag=프레시 & 프루티">
                                    프레시 & 프루티
                                </DropdownItem>
                                <DropdownItem to="/shoplist?tag=네이처 & 어스">
                                    네이처 & 어스
                                </DropdownItem>
                                <DropdownItem to="/shoplist?tag=익조틱 & 센슈얼">
                                    익조틱 & 센슈얼
                                </DropdownItem>
                                <DropdownItem to="/shoplist?tag=아쿠아틱">
                                    아쿠아틱
                                </DropdownItem>
                                <DropdownItem to="/shoplist?tag=파우더리">
                                    파우더리
                                </DropdownItem>
                                <DropdownTitle>이벤트</DropdownTitle>
                                <DropdownItem to="/shoplist?event=봄맞이할인">
                                    봄맞이할인
                                </DropdownItem>
                                <DropdownItem to="/shoplist?event=MD추천">
                                    MD추천
                                </DropdownItem>
                                <DropdownItem to="/shoplist?event=특별할인">
                                    특별할인
                                </DropdownItem>
                            </DropdownContent>
                        </Dropdown>
                    </LeftContainer>

                    <SearchBarContainer>
                        <SearchInput
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={onBlurHandler}
                            placeholder="검색어 입력"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                }
                            }}
                        />
                        <ClearButton onClick={keywordClearHandler}>
                            X
                        </ClearButton>
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
                    </SearchBarContainer>

                    <RightContainer>
                        {isLoggedIn ? (
                            <UserButtonContainer>
                                <IconButton onClick={handleLogout}>
                                    <MdExitToApp />{' '}
                                    {/* 로그아웃에 적합한 아이콘 */}
                                </IconButton>
                                <IconButton
                                    as={Link}
                                    to={isAdmin ? '/admin' : '/user'}
                                >
                                    <MdPerson />
                                </IconButton>
                            </UserButtonContainer>
                        ) : (
                            <UserButtonContainer>
                                <IconButton as={Link} to="/login">
                                    <MdPerson />
                                </IconButton>
                            </UserButtonContainer>
                        )}

                        <Dropdown>
                            {isLoggedIn ? (
                                <IconButton
                                    onClick={() => navigate('/shopcart')}
                                >
                                    <FaShoppingCart />
                                </IconButton>
                            ) : (
                                <></>
                            )}

                            {/* <DropdownContentRight>
                                <DropdownSectionTitle>
                                    언어 설정
                                </DropdownSectionTitle>
                                <DropdownItem to="#">English</DropdownItem>
                                <DropdownItem to="#">한국어</DropdownItem>
                                <DropdownSectionTitle>
                                    테마 설정
                                </DropdownSectionTitle>
                                <DropdownItem to="#">화이트</DropdownItem>
                                <DropdownItem to="#">블랙</DropdownItem>
                            </DropdownContentRight> */}
                        </Dropdown>
                    </RightContainer>

                    <MobileMenuButton onClick={toggleMobileMenu}>
                        <MdMenu />
                    </MobileMenuButton>

                    {isMobileMenuOpen && (
                        <MobileDropdownContent>
                            {/* 모바일 환경에서의 드롭다운 메뉴 항목 */}
                            <MobileSearchBarContainer>
                                <SearchInput
                                    value={searchKeyword}
                                    onChange={(e) =>
                                        setSearchKeyword(e.target.value)
                                    }
                                    onFocus={() => setShowSuggestions(true)}
                                    onBlur={onBlurHandler}
                                    placeholder="검색어 입력"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearch();
                                        }
                                    }}
                                />
                                <ClearButton
                                    onClick={() => setSearchKeyword('')}
                                >
                                    X
                                </ClearButton>
                                <SearchButton onClick={handleSearch}>
                                    <MdSearch />
                                </SearchButton>
                                <SearchSuggestionsContainer
                                    show={showSuggestions}
                                >
                                    {hasSuggestions
                                        ? suggestions.map(
                                              (suggestion, index) => (
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
                                              )
                                        )
                                        : showSuggestions && (
                                              <SuggestionItem>
                                                검색 결과가 존재하지 않습니다.
                                              </SuggestionItem>
                                          )}
                                </SearchSuggestionsContainer>
                            </MobileSearchBarContainer>
                            {isLoggedIn ? (
                                <UserButtonContainer>
                                    <DropdownLink onClick={handleLogout}>
                                        <MdExitToApp /> 로그아웃
                                    </DropdownLink>
                                    <DropdownLink
                                        to={isAdmin ? '/admin' : '/user'}
                                        onClick={closeMobileMenu}
                                    >
                                        <MdPerson /> 사용자 프로필
                                    </DropdownLink>
                                </UserButtonContainer>
                            ) : (
                                <UserButtonContainer>
                                    <DropdownLink
                                        to="/login"
                                        onClick={closeMobileMenu}
                                    >
                                        <MdPerson /> 로그인
                                    </DropdownLink>
                                </UserButtonContainer>
                            )}
                            {isLoggedIn ? (
                                <>
                                    <DropdownSectionTitle>
                                        기타
                                    </DropdownSectionTitle>
                                    <DropdownLink to="/shopcart">
                                        <FaShoppingCart />
                                        장바구니
                                    </DropdownLink>
                                </>
                            ) : (
                                <></>
                            )}
                            {/* <DropdownSectionTitle>
                                테마 설정
                            </DropdownSectionTitle>
                            <DropdownLink to="#">화이트</DropdownLink>
                            <DropdownLink to="#">블랙</DropdownLink> */}
                        </MobileDropdownContent>
                    )}
                </NavBar>
            </NavBarContainer>

            {isLoading && <LoadingModal />}
        </>
    );
};

export default UpperNavigation;
