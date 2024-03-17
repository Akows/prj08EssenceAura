import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

// 드롭다운 메뉴 아이템 정의
const menuItems = [
    {
        title: '전체상품',
        items: [{ name: '전체상품보기', link: '/shoplist?title=전체상품' }],
    },
    {
        title: '카테고리',
        items: [
            { name: '여성향수', link: '/shoplist?category=여성향수' },
            { name: '남성향수', link: '/shoplist?category=남성향수' },
            { name: '남녀공용', link: '/shoplist?category=남녀공용' },
        ],
    },
    {
        title: '태그',
        items: [
            { name: '플로랄', link: '/shoplist?tag=플로랄' },
            { name: '프레시 & 프루티', link: '/shoplist?tag=프레시 & 프루티' },
            { name: '네이처 & 어스', link: '/shoplist?tag=네이처 & 어스' },
            { name: '익조틱 & 센슈얼', link: '/shoplist?tag=익조틱 & 센슈얼' },
            { name: '아쿠아틱', link: '/shoplist?tag=아쿠아틱' },
            { name: '파우더리', link: '/shoplist?tag=파우더리' },
        ],
    },
    {
        title: '이벤트',
        items: [
            { name: '봄맞이할인', link: '/shoplist?event=봄맞이할인' },
            { name: 'MD추천', link: '/shoplist?event=MD추천' },
            { name: '특별할인', link: '/shoplist?event=특별할인' },
        ],
    },
];

const DropdownMenuContainer = styled.div`
    position: relative;
    display: inline-block;
    margin-left: 10px; // LogoButton으로부터 10px 오른쪽으로 이동
`;

const DropdownContent = styled.div`
    display: ${(props) => (props.isOpen ? 'block' : 'none')};
    position: absolute;
    background-color: white;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    z-index: 1;
    min-width: 250px;
    border-radius: 4px;
    overflow: hidden;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
`;

const DropdownItem = styled(Link)`
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
    font-size: 18px;
    font-weight: bold;
    text-decoration: underline;
    padding: 8px 16px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #ddd;
`;

const DropdownButton = styled.button`
    width: 120px;
    background: #f8f9fa;
    border: 1px solid #ddd; // 테두리 추가
    cursor: pointer;
    padding: 10px;
    margin-left: 20px;
    transition: background-color 0.3s ease; // 부드러운 배경 색상 변경 효과를 위해 추가

    &:hover {
        background-color: #e2e6ea; // 호버 시 배경 색상 변경
        border-color: #dae0e5; // 호버 시 테두리 색상 변경
    }
`;

const DropdownMenu: React.FC = ({ isOpen, toggleDropdown }) => {
    const location = useLocation();

    useEffect(() => {
        if (isOpen) {
            toggleDropdown(); // 드롭다운 메뉴 닫기
        }
    }, [location]); // 라우트 위치가 변경될 때마다 실행

    return (
        <DropdownMenuContainer>
            <DropdownButton onClick={toggleDropdown}>
                카테고리 보기
            </DropdownButton>
            <DropdownContent isOpen={isOpen}>
                {menuItems.map((section) => (
                    <React.Fragment key={section.title}>
                        <DropdownTitle>{section.title}</DropdownTitle>
                        {section.items.map((item) => (
                            <DropdownItem to={item.link} key={item.name}>
                                {item.name}
                            </DropdownItem>
                        ))}
                    </React.Fragment>
                ))}
            </DropdownContent>
        </DropdownMenuContainer>
    );
};

export default DropdownMenu;
