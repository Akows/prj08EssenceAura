import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdSearch, MdPerson, MdSettings, MdMenu } from 'react-icons/md';

const NavBar = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #f8f9fa;
`;

const LogoButton = styled(Link)`
    font-size: 24px;
    color: black;
    text-decoration: none;
    &:hover {
        color: #007bff;
    }
`;

const Dropdown = styled.div`
    position: relative;
    display: inline-block;
`;

const DropdownContent = styled.div`
    display: none;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;

    ${Dropdown}:hover & {
        display: block;
    }
`;

const DropdownLink = styled(Link)`
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    &:hover {
        background-color: #ddd;
    }
`;

const SearchBarContainer = styled.div`
    display: flex;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
`;

const SearchInput = styled.input`
    border: none;
    padding: 10px;
    flex-grow: 1;
`;

const SearchButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;
`;

const UpperNavigation: React.FC = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const isAdmin = useSelector((state) => state.auth.userInfo?.isAdmin);

    const handleSearch = () => {
        // 여기에 검색 처리 로직 작성
    };

    return (
        <NavBar>
            <LogoButton to="/shop">EssenceAura</LogoButton>

            <Dropdown>
                <button>상품보기</button>
                <DropdownContent>
                    <DropdownLink to="/shopdetail?category=category1">
                        카테고리1
                    </DropdownLink>
                    {/* 여기에 추가 카테고리 및 태그 링크 */}
                </DropdownContent>
            </Dropdown>

            <SearchBarContainer>
                <SearchInput
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="검색어 입력"
                />
                <SearchButton onClick={handleSearch}>
                    <MdSearch />
                </SearchButton>
            </SearchBarContainer>

            {isLoggedIn ? (
                <div>
                    <IconButton
                        onClick={() => {
                            /* 로그아웃 처리 로직 */
                        }}
                    >
                        <MdPerson />
                    </IconButton>
                    <IconButton as={Link} to={isAdmin ? '/admin' : '/user'}>
                        <MdPerson />
                    </IconButton>
                </div>
            ) : (
                <IconButton as={Link} to="/login">
                    <MdPerson />
                </IconButton>
            )}

            <Dropdown>
                <IconButton>
                    <MdSettings />
                </IconButton>
                <DropdownContent>
                    <DropdownLink to="#">English</DropdownLink>
                    <DropdownLink to="#">한국어</DropdownLink>
                    <DropdownLink to="#">화이트</DropdownLink>
                    <DropdownLink to="#">블랙</DropdownLink>
                </DropdownContent>
            </Dropdown>

            <IconButton className="mobile-menu-icon">
                <MdMenu />
            </IconButton>
        </NavBar>
    );
};

export default UpperNavigation;
