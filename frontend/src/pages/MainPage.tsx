import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Props 인터페이스 정의
interface IPageProps {
    expand: boolean;
}
interface INewImageTextProps {
    showNewContent: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

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
    width: ${({ expand }) =>
        expand ? '100vw' : '80vw'}; // 확대되었을 때 화면 전체 너비
    height: ${({ expand }) =>
        expand ? '100vh' : '80vh'}; // 확대되었을 때 화면 전체 높이
    transition:
        width 1s,
        height 1s,
        transform 1s;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); // scale 제거하고 단순히 중앙 정렬
    z-index: 10;
    overflow: ${({ expand }) =>
        expand ? 'auto' : 'hidden'}; // 확대되었을 때 스크롤 가능하도록 변경
`;

const ExploreButton = styled.button`
    position: absolute;
    bottom: 20px;
    right: 20px;
`;

const EnterButton = styled(ExploreButton)`
    font-family: 'Black Han Sans', sans-serif;
    color: white; // 텍스트 색상을 흰색으로 변경
    font-size: 4em; // 적당한 크기로 설정
    position: absolute; // 절대 위치
    top: 50%; // 위에서 50% 위치
    left: 50%; // 왼쪽에서 50% 위치
    transform: translate(-50%, -50%); // 정확한 중앙 위치를 위한 변환
    background: transparent; // 배경 투명
    border: none; // 테두리 없음
    cursor: pointer; // 커서 포인터로 변경
`;

const EssenceAuraText = styled.div<INewImageTextProps>`
    position: absolute; // 절대 위치
    top: 50%; // 위에서 50% 위치
    left: 50%; // 왼쪽에서 50% 위치
    transform: translate(-50%, -50%); // 정확한 중앙 위치를 위한 변환
    font-family: 'Oswald', sans-serif;
    color: white; // 텍스트 색상을 흰색으로 변경
    font-size: 4em; // 적당한 크기로 설정
    transition: opacity 1s; // 투명도 전환 효과
    opacity: ${({ showNewContent }) =>
        showNewContent ? '1' : '0'}; // 표시 상태에 따른 투명도
    animation: ${fadeIn} 2s ease-in-out; // 서서히 나타나는 애니메이션 적용
    animation-fill-mode: forwards; // 애니메이션이 끝난 상태를 유지
`;

const WelcomeText = styled(EssenceAuraText)`
    border: 2px solid white; // 흰색 테두리
    border-radius: 50%; // 원형 모양
    width: 100px; // 적당한 크기 설정
    height: 100px; // 적당한 크기 설정
    line-height: 100px; // 텍스트를 원형 안 가운데로 위치
    text-align: center; // 텍스트 가운데 정렬
    padding: 0; // 패딩 제거
`;

const MainPage: React.FC = () => {
    const [expand, setExpand] = useState(false);
    const [showEssenceAura, setShowEssenceAura] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const navigate = useNavigate();

    // 들어가기 버튼 클릭 핸들러
    const handleEnter = () => {
        setExpand(true);
        // 화면 확대 애니메이션이 끝난 후에 EssenceAuraText를 보여주기 위한 상태 변경
        setTimeout(() => setShowEssenceAura(true), 1000);
    };

    const handleWelcomeClick = () => {
        navigate('/shop'); // '환영합니다' 클릭 시 /shop 경로로 이동
    };

    // 스크롤 이벤트 핸들러
    useEffect(() => {
        // 확장 상태 변경 시 body의 overflow 스타일 조정
        if (expand) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // 확장된 후에 스크롤 이벤트 리스너를 추가하여 WelcomeText의 표시 여부를 결정
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setShowWelcome(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // 컴포넌트가 언마운트되거나 expand 상태가 변경될 때 이벤트 리스너를 제거
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [expand]);

    return (
        <Container>
            <Page expand={expand}>
                {!expand && (
                    <EnterButton onClick={handleEnter}>들어가기</EnterButton>
                )}
                {showEssenceAura && !showWelcome && (
                    <EssenceAuraText showNewContent={showEssenceAura}>
                        ESSENCEAURA
                    </EssenceAuraText>
                )}
                {showWelcome && (
                    <WelcomeText
                        showNewContent={showWelcome}
                        onClick={handleWelcomeClick}
                    >
                        환영합니다
                    </WelcomeText>
                )}
            </Page>
        </Container>
    );
};

export default MainPage;
