import React, { useState } from 'react';
import styled from 'styled-components';

// Props 인터페이스 정의
interface IPageProps {
    expand: boolean;
}

interface ITopMenuBarProps {
    showMenu: boolean;
}

interface INewImageTextProps {
    showNewContent: boolean;
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden; // 확대될 때 스크롤바가 나타나지 않도록 설정
    background: white; // 주변 흰색 영역
`;

const Page = styled.div<IPageProps>`
    background: black;
    width: 80vw; // 초기 상태에서는 화면의 80%만 차지
    height: 80vh; // 초기 상태에서는 화면의 80%만 차지
    transition:
        width 1s,
        height 1s,
        transform 1s;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: ${({ expand }) =>
        expand ? 'translate(-50%, -50%) scale(1.25)' : 'translate(-50%, -50%)'};
    z-index: 10; // 확대되는 요소가 다른 요소 위에 표시되도록 z-index 설정
`;

const ExploreButton = styled.button`
    position: absolute;
    bottom: 20px;
    right: 20px;
    // Add your styles here
`;

const TopMenuBar = styled.div<ITopMenuBarProps>`
    position: absolute;
    top: ${({ showMenu }) => (showMenu ? '0' : '-100px')};
    width: 100%;
    transition: top 1s;
    // Add your styles here
`;

const NewImageText = styled.div<INewImageTextProps>`
    position: absolute;
    right: 0;
    transition: opacity 1s;
    opacity: ${({ showNewContent }) => (showNewContent ? '1' : '0')};
    // Add your styles here
`;

const MainPage: React.FC = () => {
    const [expand, setExpand] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showNewContent, setShowNewContent] = useState(false);

    const handleExplore = () => {
        setExpand(!expand);
        setTimeout(() => setShowMenu(true), 1000);
        setTimeout(() => setShowNewContent(true), 2000);
    };

    return (
        <Container>
            <Page expand={expand}>
                <TopMenuBar showMenu={showMenu}>
                    {/* Insert menu content here */}
                </TopMenuBar>
                <ExploreButton onClick={handleExplore}>EXPLORE</ExploreButton>
                <NewImageText showNewContent={showNewContent}>
                    {/* Insert new image and text content here */}
                </NewImageText>
            </Page>
        </Container>
    );
};

export default MainPage;
