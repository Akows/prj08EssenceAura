import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdMenu } from 'react-icons/md';
import useLogout from '../../hooks/auth/useLogout';
import LoadingModal from './LoadingModal';
import SearchBar from '../navigation/SearchBar';
import DropdownMenu from '../navigation/DropdownMenu';
import UserActions from '../navigation/UserActions';
import UserActionsMobile from '../navigation/UserActionsMobile';

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

    @media (max-width: ${import.meta.env.VITE_MOBILE_SIZE}) {
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

    @media (max-width: ${import.meta.env.VITE_MOBILE_SIZE}) {
        display: block;
    }
`;

const MobileDropdownContent = styled(DropdownContent)`
    display: none;
    @media (max-width: ${import.meta.env.VITE_MOBILE_SIZE}) {
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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const isAdmin = useSelector((state) => state.auth.userInfo?.isAdmin);

    const { isLoading, handleLogout } = useLogout(); // 로그아웃 훅 사용

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
                        <SearchBar />
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
                                <SearchBar />
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
