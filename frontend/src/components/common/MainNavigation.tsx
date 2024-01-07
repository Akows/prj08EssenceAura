import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface MainNavigationProps {
    style?: React.CSSProperties; // 여기에 style 타입을 추가합니다.
}

const NavigationContainer = styled.nav`
    background-color: #333;
    color: white;
    padding: 10px 20px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Link)`
    font-size: 24px;
    font-weight: bold;
    color: white;
    text-decoration: none;
`;

const MainNavigation: React.FC<MainNavigationProps> = ({ style }) => {
    return (
        <NavigationContainer style={style}>
            <Logo to="/shop">EssenceAura</Logo>
        </NavigationContainer>
    );
};

export default MainNavigation;
