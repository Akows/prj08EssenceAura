import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { MdPerson, MdExitToApp } from 'react-icons/md';
import { FaShoppingCart } from 'react-icons/fa';

const UserButtonContainer = styled.div`
    display: flex;
    align-items: center;
    margin-right: 10px;

    @media (max-width: ${import.meta.env.VITE_MOBILE_SIZE}) {
        width: 100%; // 모바일 뷰에서는 너비를 100%로 설정하여 버튼들이 가로로 정렬되도록 합니다.
        justify-content: space-evenly; // 버튼 사이에 균등 간격을 둡니다.
    }
`;

const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;

    @media (max-width: ${import.meta.env.VITE_MOBILE_SIZE}) {
        display: none;
    }
`;

const Dropdown = styled.div`
    position: relative;
    display: inline-block;
    margin-left: 10px; // LogoButton으로부터 10px 오른쪽으로 이동
`;

const UserActions: React.FC = ({ isLoggedIn, isAdmin, handleLogout }) => {
    const navigate = useNavigate();

    return (
        <>
            {isLoggedIn ? (
                <UserButtonContainer>
                    <IconButton onClick={handleLogout}>
                        <MdExitToApp /> {/* 로그아웃에 적합한 아이콘 */}
                    </IconButton>
                    <IconButton as={Link} to={isAdmin ? '/admin' : '/user'}>
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
                    <IconButton onClick={() => navigate('/shopcart')}>
                        <FaShoppingCart />
                    </IconButton>
                ) : (
                    <></>
                )}
            </Dropdown>
        </>
    );
};

export default UserActions;
