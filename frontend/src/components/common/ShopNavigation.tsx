import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaBars, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { useChangeTheme } from '../../hooks/useChangeTheme';
import { useChangeLanguage } from '../../hooks/useChangeLanguage';
import { useStoredSettings } from '../../hooks/useStoredSettings';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useMenuState } from '../../hooks/useMenuState';
import useLogout from '../../hooks/auth/useLogout';
import LoadingModal from './LoadingModal';

const NavigationContainer = styled.nav`
    background-color: #333;
    color: white;
    padding: 10px 20px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row; // 아이콘들을 가로로 정렬
    justify-content: flex-start; // 아이콘들을 왼쪽 정렬 또는 공간 분배 조정
    margin-right: 10px;

    &:last-child {
        margin-right: 0; // 마지막 아이콘은 오른쪽 여백 없음
    }

    & > div {
        margin-left: 10px;
        margin-top: 5px;
    }
`;

const IconsContainer = styled.div`
    display: flex;
    align-items: center; // 모든 아이콘을 수직 중앙 정렬

    @media (max-width: 768px) {
        display: none; // 모바일 화면에서는 IconsContainer 숨김
    }
`;

const HamburgerMenu = styled.div`
    display: none;
    @media (max-width: 768px) {
        display: block;
    }
    cursor: pointer;
`;

const LoginButton = styled(Link)`
    margin-left: 20px; // 버튼 간의 간격 조정
    display: flex;
    align-items: center;
    color: white;
    text-decoration: none;

    & > * {
        width: 100%;
    }
`;

const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;

    & > a {
        text-decoration: none;
        color: white;
    }
`;

const NavLinks = styled.div`
    display: flex;
    align-items: center;
    @media (max-width: 768px) {
        display: none;
    }
`;

const NavLink = styled(Link)`
    color: white;
    text-decoration: none;
    margin: 0 15px;
`;

const DropdownMenu = styled.div`
    background-color: #f9f9f9;
    position: absolute;
    top: 60px; // Navigation bar의 높이에 맞춤
    left: 0;
    right: 0;
    padding: 1rem;
    display: flex;
    justify-content: start;
    align-items: flex-start;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 20;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 1rem; // 섹션 간 간격
`;

const SectionTitle = styled.h4`
    margin: 0 0 1rem 0; // 하단 마진 추가
    font-size: 1rem;
    color: #333;
`;

const Button = styled.button`
    background: none;
    border: none;
    color: #333;
    text-align: left;
    padding: 0.25rem 0;
    cursor: pointer;

    &.selected {
        background-color: #e0e0e0; // 선택된 버튼의 배경색
    }

    &:hover {
        text-decoration: underline;
    }
`;

const ButtonColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%; // 너비 조정
`;

const MobileMenu = styled.div`
    display: none;
    flex-direction: column; // 순서를 정상적으로 유지
    align-items: center; // 모든 아이템을 중앙에 정렬
    background-color: #333; // 백그라운드 색상을 설정 메뉴와 동일하게
    position: absolute;
    top: 60px; // 헤더 바로 아래 나타나도록
    left: 0;
    right: 0;
    padding: 20px; // 설정 메뉴와 같은 패딩
    box-sizing: border-box;
    z-index: 11;

    @media (max-width: 768px) {
        display: flex;
    }

    a,
    div {
        color: white; // 링크와 다른 텍스트 컬러
        padding: 10px 0; // 각 항목의 상하 패딩
        width: 100%; // 전체 너비 사용
        text-decoration: none; // 링크의 밑줄 제거
        border-bottom: none; // 모든 a 태그와 div의 기본 밑줄 제거
    }

    a:last-child,
    div:last-child {
        border-bottom: none; // 마지막 항목의 구분선 제거
    }
`;

const IconRow = styled.div`
    display: flex; // 가로로 아이템을 배치합니다.
    justify-content: space-around; // 아이콘들 사이에 공간을 균등하게 분배
    width: 100%; // 너비 100%
    margin-bottom: 20px; // 아이콘과 링크 사이에 간격을 추가
`;

const IconContainer = styled.div`
    flex: 1; // 사용 가능한 공간을 균등하게 나눕니다.
    display: flex;
    justify-content: center; // 가로 중앙 정렬
    padding: 10px; // 패딩 조정
    width: 10%; // 너비를 50%로 설정하여 두 아이콘 컨테이너가 각각 반씩 차지하도록 함
    align-items: center; // 아이콘을 세로 중앙에 배치합니다.
    border-bottom: none; // 밑줄 제거
`;

const SettingsMenu = styled.div`
    cursor: pointer;

    & > * {
        width: 100%;
    }
`;

const NavLinkStyled = styled(NavLink)`
    display: flex;
    justify-content: center;
    width: 100%; // 너비를 100%로 설정하여 가로 전체를 차지하도록 함
    margin-bottom: 10px; // 링크 사이에 간격을 추가

    &:last-child {
        margin-bottom: 0; // 마지막 링크는 마진 없음
    }
`;

const ShopNavigation: React.FC = () => {
    // 드롭다운 메뉴 관련 로직을 커스텀 훅으로 분리하여 사용.
    const {
        isHamburgerMenuOpen,
        isSettingsMenuOpen,
        toggleHamburgerMenu,
        toggleSettingsMenu,
        closeMenus,
    } = useMenuState();

    useStoredSettings(); // 로컬 스토리지에서 설정 가져오기
    const changeLanguage = useChangeLanguage();
    const changeTheme = useChangeTheme();

    const currentTheme = useSelector((state: RootState) => state.ui.theme);
    const currentLanguage = useSelector(
        (state: RootState) => state.ui.language
    );

    // Redux 스토어에서 로그인 상태 가져오기
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const isAdmin = useSelector(
        (state: RootState) => state.auth.userInfo?.isAdmin
    );

    const { isLoading, handleLogout } = useLogout(); // 로그아웃 훅 사용

    return (
        <>
            <NavigationContainer>
                {/* 로고 및 네비게이션 링크 */}
                <Logo>
                    <Link to="/">EssenceAura</Link>
                </Logo>

                {/* 데스크톱 네비게이션 링크 */}
                <NavLinks>
                    <NavLink to="/shop" onClick={closeMenus}>
                        Menu1
                    </NavLink>
                    <NavLink to="/about" onClick={closeMenus}>
                        About
                    </NavLink>
                    {/* ... 기타 링크 ... */}
                </NavLinks>

                {/* 아이콘 컨테이너 */}
                <IconsContainer>
                    <IconWrapper>
                        {/* 로그인 상태에 따라 다른 경로로 이동 */}
                        {isLoggedIn ? (
                            <>
                                <LoginButton to={isAdmin ? '/admin' : '/user'}>
                                    <FaUserCircle size={24} />
                                </LoginButton>
                                <div onClick={handleLogout}>
                                    <FaSignOutAlt size={24} />
                                </div>
                            </>
                        ) : (
                            <LoginButton to="/login">
                                <FaUserCircle size={24} />
                            </LoginButton>
                        )}
                    </IconWrapper>
                    <IconWrapper>
                        <SettingsMenu onClick={toggleSettingsMenu}>
                            <FiSettings size={24} />
                        </SettingsMenu>
                    </IconWrapper>
                    {/* HamburgerMenu는 모바일 뷰에서만 표시되므로 IconsContainer에 포함시키지 않음 */}
                </IconsContainer>

                {/* 햄버거 메뉴 아이콘 */}
                <HamburgerMenu onClick={toggleHamburgerMenu}>
                    <FaBars size={24} />
                </HamburgerMenu>

                {/* 설정 드롭다운 메뉴 */}
                {isSettingsMenuOpen && (
                    <DropdownMenu>
                        <Section>
                            <SectionTitle>언어 선택</SectionTitle>
                            <ButtonColumn>
                                <Button
                                    onClick={() => changeLanguage('en')}
                                    className={
                                        currentLanguage === 'en'
                                            ? 'selected'
                                            : ''
                                    }
                                >
                                    English
                                </Button>
                                <Button
                                    onClick={() => changeLanguage('ko')}
                                    className={
                                        currentLanguage === 'ko'
                                            ? 'selected'
                                            : ''
                                    }
                                >
                                    한국어
                                </Button>
                            </ButtonColumn>
                        </Section>
                        <Section>
                            <SectionTitle>테마 선택</SectionTitle>
                            <ButtonColumn>
                                <Button
                                    onClick={() => changeTheme('light')}
                                    className={
                                        currentTheme === 'light'
                                            ? 'selected'
                                            : ''
                                    }
                                >
                                    화이트
                                </Button>
                                <Button
                                    onClick={() => changeTheme('dark')}
                                    className={
                                        currentTheme === 'dark'
                                            ? 'selected'
                                            : ''
                                    }
                                >
                                    블랙
                                </Button>
                            </ButtonColumn>
                        </Section>
                    </DropdownMenu>
                )}

                {/* 모바일 뷰용 드롭다운 메뉴 */}
                {isHamburgerMenuOpen && (
                    <MobileMenu>
                        <IconRow>
                            {/* 아이콘들을 감싸는 행 */}
                            <IconContainer>
                                {/* 로그인 상태에 따라 다른 경로로 이동 */}
                                {isLoggedIn ? (
                                    <>
                                        <LoginButton
                                            to={isAdmin ? '/admin' : '/user'}
                                        >
                                            <FaUserCircle size={24} />
                                        </LoginButton>
                                        <div onClick={handleLogout}>
                                            <FaSignOutAlt size={24} />
                                        </div>
                                    </>
                                ) : (
                                    <LoginButton to="/login">
                                        <FaUserCircle size={24} />
                                    </LoginButton>
                                )}
                            </IconContainer>
                            <IconContainer>
                                {/* 설정 아이콘 */}
                                <SettingsMenu onClick={toggleSettingsMenu}>
                                    <FiSettings size={24} />
                                </SettingsMenu>
                            </IconContainer>
                        </IconRow>
                        {/* NavLink 컴포넌트들 */}
                        <NavLinkStyled to="/shop" onClick={closeMenus}>
                            Menu1
                        </NavLinkStyled>
                        <NavLinkStyled to="/about" onClick={closeMenus}>
                            About
                        </NavLinkStyled>
                        {/* ... 기타 링크 ... */}
                    </MobileMenu>
                )}
            </NavigationContainer>

            {isLoading && <LoadingModal />}
        </>
    );
};

export default ShopNavigation;
