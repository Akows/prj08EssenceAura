import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// TextProps는 isVisible prop의 타입을 정의
interface TextProps {
    isVisible: boolean;
}

// Text 스타일 컴포넌트는 isVisible prop에 따라 투명도와 위치 변환을 적용
const Text = styled.div<TextProps>`
    opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
    transform: translateY(${({ isVisible }) => (isVisible ? '0px' : '20px')});
    transition:
        opacity 0.6s ease-out,
        transform 0.6s ease-out;
    margin-bottom: 100vh; // 각 텍스트 요소 아래에 뷰포트 높이만큼 마진 추가
`;

const HomePage: React.FC = () => {
  // isVisible 상태는 각 텍스트의 가시성을 관리
  const [isVisible, setIsVisible] = useState({
    text1: false,
    text2: false,
    text3: false,
  });

  // 각 텍스트 요소를 참조하기 위한 ref
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);

  useEffect(() => {
    // 각 요소가 뷰포트에 들어오는지 감지
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 각 요소가 뷰포트에 들어오면 isVisible 상태 업데이트
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.5 }
    ); // 요소가 뷰포트의 50% 보일 때 트리거

    // 각 ref가 실제 DOM 요소를 가리키고 있으면 observer에 등록
    if (text1Ref.current) {
      observer.observe(text1Ref.current);
    }
    if (text2Ref.current) {
      observer.observe(text2Ref.current);
    }
    if (text3Ref.current) {
      observer.observe(text3Ref.current);
    }

    // 컴포넌트 언마운트 시 observer 연결 해제
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      {/* 각 Text 컴포넌트는 ref와 isVisible 상태를 props로 받아 렌더링 */}
      <Text ref={text1Ref} id="text1" isVisible={isVisible.text1}>
              Text 1
            </Text>
      <Text ref={text2Ref} id="text2" isVisible={isVisible.text2}>
              Text 2
            </Text>
      <Text ref={text3Ref} id="text3" isVisible={isVisible.text3}>
              Text 3
            </Text>
    </div>
  );
};

export default HomePage;
