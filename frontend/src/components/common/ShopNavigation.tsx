import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import { useChangeTheme } from '../../hooks/useChangeTheme';
import { useChangeLanguage } from '../../hooks/useChangeLanguage';
import { useStoredSettings } from '../../hooks/useStoredSettings';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useMenuState } from '../../hooks/useMenuState';

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

const HamburgerMenu = styled.div`
    display: none;
    @media (max-width: 768px) {
        display: block;
    }
    cursor: pointer;
`;

const Logo = styled.div`
    font-size: 24px;
    font-weight: bold;
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
    flex-direction: column;
    align-items: flex-start;
    background-color: #333;
    position: absolute;
    top: 100%; // 메뉴가 설정 버튼 바로 아래 나타나도록
    right: 0; // 메뉴가 설정 버튼 우측에 정렬되도록
    min-width: 200px; // 드롭다운 메뉴의 최소 너비를 지정
    box-sizing: border-box;
    z-index: 11; // 메뉴가 다른 요소들 위에 나타나도록 z-index 설정

    @media (max-width: 768px) {
        display: flex;
        width: auto; // 모바일에서는 화면 너비에 맞게 조정
    }
`;

const SettingsMenu = styled.div`
    cursor: pointer;
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

    return (
        <NavigationContainer>
            <Logo>EssenceAura</Logo>
            <NavLinks>
                <NavLink to="/" onClick={closeMenus}>
                    Home
                </NavLink>
                <NavLink to="/home" onClick={closeMenus}>
                    About
                </NavLink>
                {/* ... 기타 링크 ... */}
            </NavLinks>
            <div>
                <SettingsMenu onClick={() => toggleSettingsMenu()}>
                    <FiSettings size={24} color="white" />
                </SettingsMenu>
                <HamburgerMenu onClick={() => toggleHamburgerMenu()}>
                    <FaBars size={24} color="white" />
                </HamburgerMenu>
            </div>
            {/* 설정 드롭다운 메뉴 */}
            {isSettingsMenuOpen && (
                <DropdownMenu>
                    <Section>
                        <SectionTitle>언어 선택</SectionTitle>
                        <ButtonColumn>
                            <Button
                                onClick={() => changeLanguage('en')}
                                className={
                                    currentLanguage === 'en' ? 'selected' : ''
                                }
                            >
                                English
                            </Button>
                            <Button
                                onClick={() => changeLanguage('ko')}
                                className={
                                    currentLanguage === 'ko' ? 'selected' : ''
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
                                    currentTheme === 'light' ? 'selected' : ''
                                }
                            >
                                화이트
                            </Button>
                            <Button
                                onClick={() => changeTheme('dark')}
                                className={
                                    currentTheme === 'dark' ? 'selected' : ''
                                }
                            >
                                블랙
                            </Button>
                        </ButtonColumn>
                    </Section>
                </DropdownMenu>
            )}
            {/* 햄버거 드롭다운 메뉴 */}
            {isHamburgerMenuOpen && (
                <MobileMenu>
                    <NavLink to="/" onClick={closeMenus}>
                        Home
                    </NavLink>
                    <NavLink to="/shop" onClick={closeMenus}>
                        About
                    </NavLink>
                    {/* ... 기타 링크 ... */}
                </MobileMenu>
            )}
        </NavigationContainer>
    );
};

export default ShopNavigation;
