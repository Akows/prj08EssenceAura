import React from 'react';
import styled, { keyframes } from 'styled-components';

// 스피너 애니메이션
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// 로딩 모달 스타일
const LoadingModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

// 스피너 스타일
const Spinner = styled.div`
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: ${spin} 2s linear infinite;
`;

const LoadingModal: React.FC = () => {
    return (
        <LoadingModalWrapper>
            <Spinner />
        </LoadingModalWrapper>
    );
};

export default LoadingModal;
