import React from 'react';
import styled from 'styled-components';

interface Status {
    status: string;
}

const OrderCard = styled.div`
    background: white;
    border: 1px solid #ddd;
    margin-top: 20px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const OrderHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const OrderTitle = styled.h2`
    font-size: 18px;
    color: #333;
`;

const OrderDate = styled.span`
    color: #666;
`;

const OrderList = styled.ul`
    list-style: none;
    padding: 0;
`;

const OrderItem = styled.li`
    padding: 10px 0;
    border-bottom: 1px solid #eee;

    &:last-child {
        border-bottom: none;
    }
`;

const OrderDetail = styled.div`
    display: flex;
    justify-content: space-between;
`;

const OrderInfo = styled.span`
    color: #333;
`;

const OrderStatus = styled.span<Status>`
    color: ${({ status }) => (status === '처리중' ? '#e44d26' : '#4CAF50')};
`;

const OrderManagement: React.FC = () => {
    const orders = [
        {
            id: 1,
            date: '2024-01-05',
            customer: '홍길동',
            total: '₩35,000',
            status: '처리중',
        },
        {
            id: 2,
            date: '2024-01-04',
            customer: '김철수',
            total: '₩120,000',
            status: '배송완료',
        },
    ];

    return (
        <OrderCard>
            <OrderHeader>
                <OrderTitle>주문 현황</OrderTitle>
                <OrderDate>최근 주문</OrderDate>
            </OrderHeader>
            <OrderList>
                {orders.map((order) => (
                    <OrderItem key={order.id}>
                        <OrderDetail>
                            <OrderInfo>주문 번호: {order.id}</OrderInfo>
                            <OrderInfo>주문자: {order.customer}</OrderInfo>
                            <OrderInfo>주문 일자: {order.date}</OrderInfo>
                            <OrderInfo>총액: {order.total}</OrderInfo>
                            <OrderStatus status={order.status}>
                                {order.status}
                            </OrderStatus>
                        </OrderDetail>
                    </OrderItem>
                ))}
            </OrderList>
        </OrderCard>
    );
};

export default OrderManagement;
