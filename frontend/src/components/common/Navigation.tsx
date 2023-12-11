import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useChangeTheme } from '../../hooks/useChangeTheme';
import { useChangeLanguage } from '../../hooks/useChangeLanguage';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #333;
  color: white;
  padding: 10px 0;
  z-index: 1000;
`;

const NavInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 10px;
`;

const RightSection = styled.div`
  display: flex;
`;

const Button = styled.button`
  background-color: transparent;
  border: 1px solid white;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 10px;
`;

const Navigation: React.FC = () => {
  const changeTheme = useChangeTheme();
  const changeLanguage = useChangeLanguage();

  return (
    <Nav>
      <NavInner>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <RightSection>
          <Button><NavLink to="/signup">Sign Up</NavLink></Button>
          <Button>Log In</Button>
          {/* 언어 변경 버튼 */}
          <Button onClick={() => changeLanguage('en')}>EN</Button>
          <Button onClick={() => changeLanguage('ko')}>KO</Button>
          {/* 테마 변경 버튼 */}
          <Button onClick={() => changeTheme('light')}>Light</Button>
          <Button onClick={() => changeTheme('dark')}>Dark</Button>
        </RightSection>
      </NavInner>
    </Nav>
  );
};

export default Navigation;

