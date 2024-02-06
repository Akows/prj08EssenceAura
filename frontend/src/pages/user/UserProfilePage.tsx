import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import UserInfoForm from '../../components/user/UserInfoForm';
import UserOrdersForm from '../../components/user/UserOrdersForm';

interface TabProps {
    active: boolean;
    onClick: () => void;
}

const Container = styled.div`
    width: 90%;
    max-width: 1200px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-top: 60px;
`;

const Title = styled.h1`
    text-align: center;
    margin-top: 20px;
`;

const Tabs = styled.div`
    display: flex;
    justify-content: center;
    background-color: #f3f3f3;
`;

const Tab = styled.button<TabProps>`
    padding: 10px 20px;
    border: none;
    background-color: inherit;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    ${({ active }) =>
        active &&
        `
    border-bottom: 3px solid #e44d26;
    font-weight: bold;
  `}
`;

// 회원 정보 페이지 컴포넌트
const UserProfilePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('userInfo');

    // 구매 확인 페이지에서 회원 정보 페이지로 넘어왔을 때, 구매내역 컴포넌트가 렌더링되도록 하는 기능.
    // 페이지를 이동할 때 쿼리 파라미터를 사용. navigate('/user?tab=orders');
    // URL에서 쿼리 파라미터를 읽기 위해 useLocation 사용.
    const location = useLocation();

    // URL 쿼리 파라미터에 따라 activeTab 초기값 설정
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        // 쿼리스트링에서 tab의 값을 가져온다.
        const tab = searchParams.get('tab');

        // 쿼리스트링 값의 존재 여부를 따져 렌더링 될 탭의 종류를 지정한다.
        if (tab) {
            setActiveTab(tab);
        } else {
            setActiveTab('userInfo');
        }
    }, [location]);

    return (
        <Container>
            <Title>회원 정보 페이지</Title>

            <Tabs>
                <Tab
                    active={activeTab === 'userInfo'}
                    onClick={() => setActiveTab('userInfo')}
                >
                    회원정보
                </Tab>
                <Tab
                    active={activeTab === 'orders'}
                    onClick={() => setActiveTab('orders')}
                >
                    구매내역
                </Tab>
            </Tabs>

            {activeTab === 'userInfo' && <UserInfoForm />}

            {activeTab === 'orders' && <UserOrdersForm />}
        </Container>
    );
};

export default UserProfilePage;
