import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainNavigation from '../components/common/MainNavigation';

// Props 인터페이스 정의
interface IPageProps {
    expand: boolean;
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
    const [showNewContent] = useState(false);

    useEffect(() => {
        if (expand) {
            // EXPLORE 버튼을 클릭하면, 일정 시간 후에 메뉴가 등장하도록 설정
            const timer = setTimeout(() => {
                setShowMenu(true);
            }, 1000); // 1초 후에 메뉴를 보여줌
            return () => clearTimeout(timer);
        } else {
            setShowMenu(false); // expand가 false인 경우 즉시 메뉴 숨기기
        }
    }, [expand]); // expand 상태가 변경될 때마다 useEffect 실행

    const handleExplore = () => {
        setExpand(!expand); // EXPLORE 버튼 클릭 시 expand 상태 토글
    };

    return (
        <Container>
            <Page expand={expand}>
                {/* showMenu 상태에 따라 MainNavigation을 조건부 렌더링합니다. */}
                {showMenu && (
                    <MainNavigation
                        style={{
                            position: 'fixed',
                            top: expand ? '0' : '-100px', // expand 상태에 따라 top 위치 변경
                            left: '0',
                            right: '0',
                            transition: 'top 0.5s ease-in-out', // 부드러운 전환 효과
                            width: '100%', // 메뉴바 가로 너비를 페이지 전체로 설정
                            zIndex: 100, // 다른 요소들 위에 오도록 z-index 설정
                        }}
                    />
                )}

                <ExploreButton onClick={handleExplore}>EXPLORE</ExploreButton>
                <NewImageText showNewContent={showNewContent}>
                    {/* Insert new image and text content here */}
                </NewImageText>
            </Page>
        </Container>
    );
};

export default MainPage;
