import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';

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
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  z-index: 20;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 2rem; // 섹션 간 간격
`;

const SectionTitle = styled.h4`
  margin: 0;
  padding-bottom: 0.5rem;
  font-size: 1rem;
  color: #333;
  margin-right: 10px; // 타이틀과 버튼 사이의 간격
`;

const ButtonColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: #333;
  text-align: left;
  padding: 0.25rem 0;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
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

const Navigation: React.FC = () => {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);

  // 메뉴를 닫는 함수
  const closeMenus = () => {
    setIsHamburgerMenuOpen(false);
    setIsSettingsMenuOpen(false);
  };

  return (
    <NavigationContainer>
      <Logo>EssenceAura</Logo>
      <NavLinks>
        <NavLink to="/" onClick={closeMenus}>Home</NavLink>
        <NavLink to="/about" onClick={closeMenus}>About</NavLink>
        {/* ... 기타 링크 ... */}
      </NavLinks>
      <div>
        <SettingsMenu onClick={() => setIsSettingsMenuOpen(!isSettingsMenuOpen)}>
          <FiSettings size={24} color="white" />
        </SettingsMenu>
        <HamburgerMenu onClick={() => setIsHamburgerMenuOpen(!isHamburgerMenuOpen)}>
          <FaBars size={24} color="white" />
        </HamburgerMenu>
      </div>
      {/* 설정 드롭다운 메뉴 */}
      {isSettingsMenuOpen && (
        <DropdownMenu>
          <Section>
            <SectionTitle>언어 선택</SectionTitle>
            <ButtonColumn>
              <Button onClick={() => {/* 언어 변경 로직 */}}>English</Button>
              <Button onClick={() => {/* 언어 변경 로직 */}}>한국어</Button>
            </ButtonColumn>
          </Section>
          <Section>
            <SectionTitle>테마 선택</SectionTitle>
            <ButtonColumn>
              <Button onClick={() => {/* 테마 변경 로직 */}}>화이트</Button>
              <Button onClick={() => {/* 테마 변경 로직 */}}>블랙</Button>
            </ButtonColumn>
          </Section>
        </DropdownMenu>
      )}
      {/* 햄버거 드롭다운 메뉴 */}
      {isHamburgerMenuOpen && (
        <MobileMenu>
          <NavLink to="/" onClick={closeMenus}>Home</NavLink>
          <NavLink to="/about" onClick={closeMenus}>About</NavLink>
          {/* ... 기타 링크 ... */}
        </MobileMenu>
      )}
    </NavigationContainer>
  );
};

export default Navigation;
