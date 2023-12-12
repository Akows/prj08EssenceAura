import React from 'react';
import styled from 'styled-components';

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

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterText>EssenceAura</FooterText>
    </FooterContainer>
  );
};

export default Footer;
