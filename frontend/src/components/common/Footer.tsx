import React from 'react';
import styled from 'styled-components';
import { useChangeLanguage } from '../../hooks/useChangeLanguage';
import { useChangeTheme } from '../../hooks/useChangeTheme';

const FooterContainer = styled.footer`
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box; // 페이지 모서리로부터 떨어지지 않도록
`;

const FooterText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 20px;
  position: absolute; // 중앙에 위치
  left: 50%;
  transform: translateX(-50%);
`;

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  color: black;
  left: 0;

  & button {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    border: none;
    background: none;
    text-align: left;

    &:hover {
      background-color: #f1f1f1;
    }
  }
`;

const DropdownButton = styled.button`
  background-color: transparent;
  border: 1px solid white;
  color: white;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    ${DropdownContent} {
      display: block;
    }
  }
`;

const Footer: React.FC = () => {
  const changeTheme = useChangeTheme();
  const changeLanguage = useChangeLanguage();

  return (
    <FooterContainer>
      <Dropdown>
        <DropdownButton>설정</DropdownButton>
        <DropdownContent>
          <button onClick={() => changeLanguage('en')}>EN</button>
          <button onClick={() => changeLanguage('ko')}>KO</button>
          <button onClick={() => changeTheme('dark')}>Dark</button>
          <button onClick={() => changeTheme('light')}>Light</button>
        </DropdownContent>
      </Dropdown>
      <FooterText>EssenceAura</FooterText>
    </FooterContainer>
  );
};

export default Footer;
