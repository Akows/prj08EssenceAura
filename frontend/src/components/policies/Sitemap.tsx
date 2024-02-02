// Sitemap.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SitemapContainer = styled.div`
    background: white;
    color: black;
    padding: 20px;
    margin: 20px;
    border-radius: 5px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Title = styled.h1`
    font-size: 24px;
    text-align: center;
`;

const List = styled.ul`
    list-style: none;
    padding: 0;
`;

const ListItem = styled.li`
    margin: 10px 0;
`;

const SitemapLink = styled(Link)`
    color: blue;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

const Sitemap: React.FC = () => {
    return (
        <SitemapContainer>
            <Title>사이트맵</Title>

            <List>
                <ListItem>
                    <SitemapLink to="/">홈페이지</SitemapLink>
                </ListItem>

                <ListItem>
                    <SitemapLink to="/shop">쇼핑몰 홈</SitemapLink>
                </ListItem>

                <ListItem>
                    <SitemapLink to="/shoplist">제품 목록</SitemapLink>
                </ListItem>

                <ListItem>
                    <SitemapLink to="/user">사용자 프로필</SitemapLink>
                </ListItem>

                <ListItem>
                    <SitemapLink to="/termsofservice">이용 약관</SitemapLink>
                </ListItem>

                <ListItem>
                    <SitemapLink to="/privacypolicy">
                        개인정보 처리방침
                    </SitemapLink>
                </ListItem>
            </List>
        </SitemapContainer>
    );
};

export default Sitemap;
