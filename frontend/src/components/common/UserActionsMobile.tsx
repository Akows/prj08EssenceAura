import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MdExitToApp, MdPerson } from 'react-icons/md';
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

const DropdownTitle = styled.div`
    font-size: 18px; // 대분류 항목의 글자 크기
    font-weight: bold; // 대분류 항목을 굵게
    text-decoration: underline; // 밑줄
    padding: 8px 16px; // 패딩
    background-color: #f8f9fa; // 배경색
    border-bottom: 1px solid #ddd; // 구분선
`;

const DropdownSectionTitle = styled(DropdownTitle)`
    background-color: transparent; // 배경색을 투명하게 설정합니다.
    border-bottom: none; // 구분선을 제거합니다.
`;

const UserActionsMobile: React.FC = ({
    isLoggedIn,
    isAdmin,
    handleLogout,
    closeMobileMenu,
}) => {
    return (
        <>
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
                    <DropdownLink to="/login" onClick={closeMobileMenu}>
                        <MdPerson /> 로그인
                    </DropdownLink>
                </UserButtonContainer>
            )}
            {isLoggedIn ? (
                <>
                    <DropdownSectionTitle>기타</DropdownSectionTitle>
                    <DropdownLink to="/shopcart">
                        <FaShoppingCart />
                        장바구니
                    </DropdownLink>
                </>
            ) : (
                <></>
            )}
        </>
    );
};

export default UserActionsMobile;
