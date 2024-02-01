import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// isActive 속성을 받기 위한 인터페이스 정의
interface DotProps {
    isActive: boolean;
}

const SliderContainer = styled.div`
    position: relative;
    height: 500px; // 슬라이더 높이 설정
    overflow: hidden;
`;

const Slide = styled.div`
    width: 100%;
    height: 100%;
    transition: all 0.5s ease-in-out;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover; // 이미지가 컨테이너를 꽉 채우도록 설정
    }
`;

const SliderControls = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    width: 100%;
    transform: translateY(-50%);
    padding: 0 20px;
    box-sizing: border-box;
`;

// 슬라이더 내부의 각 버튼 컴포넌트
const ControlButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px; // 아이콘의 크기 조정
    color: black; // 아이콘의 색상
    transition: background-color 0.3s;

    &:hover {
        background-color: rgba(255, 255, 255, 0.5); // 호버 시 버튼 배경색 변경
        border-radius: 50%; // 호버 시 버튼 모양을 원형으로 변경
    }
`;

const PlayPauseButton = styled(ControlButton)`
    width: 30px;
    height: 30px;
    position: absolute;
    bottom: 16.5px;
    right: 10px;
`;

// 슬라이더 하단의 도트 컨테이너 스타일
const DotsContainer = styled.div`
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    padding: 5px 10px;
    background: rgba(0, 0, 0, 0.5); // 도트의 배경색
    border-radius: 20px; // 도트 컨테이너의 모서리 둥글게 처리
`;

// 슬라이더 하단의 도트 스타일
const Dot = styled.button<DotProps>`
    padding: 5px;
    margin: 0 5px;
    cursor: pointer;
    background-color: ${(props) =>
        props.isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)'};
    border-radius: 50%; // 도트를 원형으로 만듦
    border: none;
    transition: background-color 0.3s;

    &:hover {
        background-color: #ffffff;
    }
`;

// 배너 예시
const banners = [
    '/banner1.jpg',
    '/banner2.jpg',
    '/banner3.jpg',
    // ... 더 많은 배너 이미지
];

const Slider: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const navigate = useNavigate();

    // 슬라이드 이동 함수
    const goToSlide = (index: number) => {
        if (index < 0) {
            // 첫 번째 슬라이드 이전으로 가려고 할 때 마지막 슬라이드로 설정
            setActiveIndex(banners.length - 1);
        } else if (index > banners.length - 1) {
            // 마지막 슬라이드를 넘어서려고 할 때 첫 번째 슬라이드로 설정
            setActiveIndex(0);
        } else {
            // 그 외에는 선택된 인덱스로 설정
            setActiveIndex(index);
        }
    };
    // 자동 이동 함수
    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    // 슬라이드 자동 이동
    useEffect(() => {
        let interval: number | undefined; // interval의 타입을 number로 지정
        if (isPlaying) {
            interval = window.setInterval(() => {
                // window를 명시하여 브라우저의 setInterval을 사용한다는 것을 분명히 함
                setActiveIndex((current) =>
                    current === banners.length - 1 ? 0 : current + 1
                );
            }, 3000);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isPlaying, banners.length]);

    return (
        <SliderContainer>
            {banners.map((banner, index) => (
                <Slide
                    key={index}
                    style={{
                        transform: `translateX(-${activeIndex * 100}%)`,
                    }}
                >
                    <img src={banner} alt={`Banner ${index + 1}`} />
                </Slide>
            ))}
            <SliderControls>
                <ControlButton onClick={() => goToSlide(activeIndex - 1)}>
                    &#10094; {/* Left arrow */}
                </ControlButton>
                <ControlButton onClick={() => goToSlide(activeIndex + 1)}>
                    &#10095; {/* Right arrow */}
                </ControlButton>
            </SliderControls>
            <DotsContainer>
                {banners.map((_, index) => (
                    <Dot
                        key={index}
                        isActive={index === activeIndex}
                        onClick={() => setActiveIndex(index)}
                    />
                ))}
            </DotsContainer>
            <PlayPauseButton onClick={togglePlayPause}>
                {isPlaying ? '||' : '▶'}
            </PlayPauseButton>
        </SliderContainer>
    );
};

export default Slider;
