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
    overflow: ${({ expand }) =>
        expand ? 'auto' : 'hidden'}; // EnterButton 클릭 전 스크롤 영역 숨김
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
    width: 300px; // 원의 크기를 늘림
    height: 300px;
    line-height: 300px; // 텍스트를 원형 안 가운데로 위치
    font-family: 'Black Han Sans', sans-serif;
    font-size: 3em; // 텍스트 크기 조정
    text-align: center; // 텍스트 가운데 정렬
    padding: 0; // 패딩 제거

    &:hover {
        transform: translate(-50%, -50%) rotate(720deg); // 720도 회전
        transition: transform 0.5s ease-in-out; // 부드러운 전환을 위한 지연시간 적용
    }
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

    // 스크롤 이벤트 관리를 위한 useEffect 훅
    useEffect(() => {
        // 스크롤을 방지하기 위한 함수입니다. expand 상태가 false일 때 (즉, EnterButton이 아직 클릭되지 않았을 때)
        // 스크롤을 시도하는 모든 행위를 방지합니다.
        const preventScroll = (e: WheelEvent) => {
            if (!expand) {
                e.preventDefault();
            }
        };

        // 'wheel' 이벤트 리스너를 window에 추가합니다. 이를 통해 사용자가 페이지를 스크롤하려 할 때
        // preventScroll 함수가 호출되어 스크롤을 방지할 수 있습니다. passive: false는 preventDefault가
        // 호출될 수 있도록 하여 기본 스크롤 동작을 중단시키는데 필요합니다.
        window.addEventListener('wheel', preventScroll, { passive: false });

        // 실제 스크롤 이벤트를 처리하는 함수입니다. 사용자가 페이지를 스크롤할 때마다 호출됩니다.
        const handleScroll = () => {
            // 만약 expand 상태가 false라면 (EnterButton이 클릭되지 않았다면), 스크롤을 시도해도 페이지가
            // 최상단으로 이동하도록 강제합니다. 즉, 스크롤을 할 수 없습니다.
            if (!expand) {
                window.scrollTo(0, 0);
                return;
            }

            // 사용자가 스크롤을 내렸을 때, 그리고 아직 WelcomeText가 표시되지 않았다면,
            // EssenceAuraText를 숨기고 WelcomeText를 표시합니다. 이 과정에서 500ms의 지연을 줘서
            // 부드러운 전환 효과를 만듭니다.
            if (window.scrollY > 0 && !showWelcome) {
                setShowEssenceAura(false);
                setTimeout(() => setShowWelcome(true), 500);
            }

            // 사용자가 페이지를 다시 최상단으로 스크롤 올렸을 때, 그리고 WelcomeText가 표시되어 있다면,
            // WelcomeText를 숨기고 EssenceAuraText를 다시 표시합니다. 이때도 500ms의 지연시간을 두어
            // 부드러운 전환 효과를 만듭니다.
            if (window.scrollY === 0 && showWelcome) {
                setShowWelcome(false);
                setTimeout(() => setShowEssenceAura(true), 500);
            }
        };

        // expand 상태가 true일 때 (EnterButton이 클릭된 후), 실제 스크롤 이벤트 리스너를 추가합니다.
        // 이제 사용자가 스크롤을 하면 handleScroll 함수가 호출됩니다.
        if (expand) {
            window.addEventListener('scroll', handleScroll);
        }

        // 컴포넌트가 언마운트될 때, 혹은 expand 혹은 showWelcome 상태가 변경될 때,
        // 스크롤과 wheel 이벤트에 대한 모든 리스너를 정리합니다. 이는 메모리 누수를 방지하고
        // 필요하지 않은 이벤트 리스너가 남아있지 않도록 합니다.
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('wheel', preventScroll);
        };
    }, [expand, showWelcome]); // expand와 showWelcome 상태가 변경될 때마다 이 useEffect 훅을 실행합니다.

    return (
        <Container>
            <Page expand={expand}>
                {!expand && (
                    <EnterButton onClick={handleEnter}>안녕하세요</EnterButton>
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
                        환영합니다!
                    </WelcomeText>
                )}
            </Page>
        </Container>
    );
};

export default MainPage;
