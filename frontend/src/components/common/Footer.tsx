import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    background-color: #333;
    color: white;
    padding: 20px;
    text-align: center;
    display: flex;
    flex-direction: column; // 세로 정렬
    align-items: center; // 가로축에서 중앙 정렬
    box-sizing: border-box;
`;

const FooterTop = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly; // 항목들을 균등하게 분포
    margin-bottom: 20px; // 하단 텍스트와의 여백

    @media (max-width: ${import.meta.env.VITE_MOBILE_SIZE}) {
        flex-direction: column;
    }
`;

const FooterLink = styled.a`
    color: white;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }

    @media (max-width: ${import.meta.env.VITE_MOBILE_SIZE}) {
        margin-bottom: 5px;
    }
`;

const FooterBottom = styled.div`
    font-size: 0.8em;
`;

const Footer: React.FC = () => {
    const navigate = useNavigate();

    return (
        <FooterContainer>
            <FooterTop>
                <FooterLink onClick={() => navigate('/sitemap')}>
                    사이트맵
                </FooterLink>
                <FooterLink onClick={() => navigate('/privacypolicy')}>
                    개인정보 처리방침
                </FooterLink>
                <FooterLink onClick={() => navigate('/termsofservice')}>
                    이용 약관
                </FooterLink>
                <FooterLink href="#">연락처</FooterLink>
            </FooterTop>
            <FooterBottom>
                Created by EssenceAura, {new Date().getFullYear()}. Shared with
                the community.
            </FooterBottom>
        </FooterContainer>
    );
};

export default Footer;
