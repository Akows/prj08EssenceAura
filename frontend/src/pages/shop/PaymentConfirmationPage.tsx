import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

const ConfirmationContainer = styled.div`
    margin: 30px;
    max-width: 800px;
    padding: 20px;
    text-align: center;

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

const ConfirmationTitle = styled.h2`
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
`;

const ConfirmationMessage = styled.p`
    color: #666;
    font-size: 18px;
    margin-bottom: 40px;
`;

const ConfirmationButton = styled.button`
    background-color: #e44d26;
    color: white;
    text-decoration: none;
    padding: 10px 20px;
    font-size: 18px;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #f55f3b;
    }

    @media (max-width: 768px) {
        width: 100%;
        display: block;
    }
`;

const PaymentConfirmationPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleConfirmOrder = () => {
        navigate('/user?tab=orders');
    };

    useEffect(() => {
        const isStatus = location.state?.status;

        if (!isStatus) {
            alert('잘못된 접근입니다.');
            navigate('/shop');
        }
    }, [location]);

    return (
        <ConfirmationContainer>
            <ConfirmationTitle>결제 완료</ConfirmationTitle>
            <ConfirmationMessage>
                주문이 성공적으로 완료되었습니다. 이메일을 확인해 주세요.
            </ConfirmationMessage>
            <ConfirmationButton onClick={handleConfirmOrder}>
                주문 상세 보기
            </ConfirmationButton>
        </ConfirmationContainer>
    );
};

export default PaymentConfirmationPage;
