import { useState, useEffect } from 'react';
import styled from 'styled-components';

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

const DotsContainer = styled.div`
    position: absolute;
    bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
`;

// DotProps 인터페이스를 사용하여 styled-component 정의
const Dot = styled.div<DotProps>`
    padding: 5px;
    margin-right: 5px;
    cursor: pointer;
    border-radius: 50%;
    background: ${(props) => (props.isActive ? 'black' : 'white')};
`;

const banners = [
    '/path/to/banner1.jpg',
    '/path/to/banner2.jpg',
    '/path/to/banner3.jpg',
    // ... 더 많은 배너 이미지
];

const HomePage = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((current) =>
                current === banners.length - 1 ? 0 : current + 1
            );
        }, 3000); // 3초마다 슬라이드 변경
        return () => clearInterval(interval);
    }, []);

    return (
        <SliderContainer>
            {banners.map((banner, index) => (
                <Slide
                    key={index}
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                >
                    <img src={banner} alt={`Banner ${index + 1}`} />
                </Slide>
            ))}
            <DotsContainer>
                {banners.map((_, index) => (
                    <Dot
                        key={index}
                        isActive={index === activeIndex}
                        onClick={() => setActiveIndex(index)}
                    />
                ))}
            </DotsContainer>
        </SliderContainer>
    );
};

export default HomePage;
