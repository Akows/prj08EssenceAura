import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

interface TabProps {
    active: boolean;
    onClick: () => void;
}

const Container = styled.div`
    width: 100%;
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

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin-top: 15px;
`;

const Input = styled.input`
    padding: 8px;
    margin-top: 5px;
`;

const Button = styled.button`
    padding: 10px 15px;
    margin-top: 20px;
    background-color: #e44d26;
    color: white;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: #f55f3b;
    }
`;

const SectionTitle = styled.h2`
    padding-top: 20px;
    border-top: 1px solid #ddd;
    margin-top: 20px;
`;

const OrderList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const OrderItem = styled.li`
    padding: 10px 0;
    border-bottom: 1px solid #eee;
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

// 가상의 데이터
const dummyOrders = [
    { id: 1, product: '제품 A', date: '2023-01-01', status: '배송 완료' },
    { id: 2, product: '제품 B', date: '2023-01-05', status: '배송 중' },
    // ...더 많은 주문...
];

// 회원 정보 페이지 컴포넌트
const UserProfilePage = () => {
    const [userInfo, setUserInfo] = useState({
        name: '홍길동',
        email: 'user@example.com',
        address: '서울시 강남구',
    });

    const [activeTab, setActiveTab] = useState('userInfo');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert('정보가 업데이트 되었습니다.');
    };

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

            {activeTab === 'userInfo' && (
                <Form onSubmit={handleSubmit}>
                    <SectionTitle>회원정보</SectionTitle>
                    <Label htmlFor="name">이름</Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        value={userInfo.name}
                        onChange={handleChange}
                    />

                    <Label htmlFor="email">이메일</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={userInfo.email}
                        onChange={handleChange}
                    />

                    <Label htmlFor="address">주소</Label>
                    <Input
                        id="address"
                        name="address"
                        type="text"
                        value={userInfo.address}
                        onChange={handleChange}
                    />

                    <Button type="submit">정보 수정</Button>
                </Form>
            )}

            {activeTab === 'orders' && (
                <OrderList>
                    <SectionTitle>구매내역</SectionTitle>
                    <OrderList>
                        {dummyOrders.map((order) => (
                            <OrderItem key={order.id}>
                                <div>제품명: {order.product}</div>
                                <div>주문날짜: {order.date}</div>
                                <div>주문상태: {order.status}</div>
                            </OrderItem>
                        ))}
                    </OrderList>
                </OrderList>
            )}
        </Container>
    );
};

export default UserProfilePage;
