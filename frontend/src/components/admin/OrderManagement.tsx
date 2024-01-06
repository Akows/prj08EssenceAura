import React from 'react';
import styled from 'styled-components';

interface StatusProps {
    status: '처리중' | '배송완료'; // 예시로 주문 상태를 명시적으로 정의
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
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
`;

const OrderInfo = styled.span`
    color: #333;
`;

const OrderStatus = styled.span<StatusProps>`
    color: ${({ status }) => (status === '처리중' ? '#e44d26' : '#4CAF50')};
`;

const UserDetails = styled.div`
    color: #555;
`;

const Address = styled.div`
    color: #555;
    margin-top: 5px;
`;

const ProductDetail = styled.div`
    display: flex;
    justify-content: space-between;
    background: #f9f9f9;
    padding: 10px;
    border: 1px solid #eee;
`;

const orders = [
    {
        order_id: 1,
        user_id: 'user_101',
        total_price: 35000,
        discount_amount: 5000,
        delivery_address: '서울시 강남구 테헤란로',
        status: '처리중',
        created_at: '2024-01-05',
        order_details: [
            {
                product_id: 'prod_201',
                price: 20000,
                quantity: 1,
                product_option: '100ml',
            },
            {
                product_id: 'prod_202',
                price: 15000,
                quantity: 1,
                product_option: 'Red',
            },
        ],
    },
    // ...더 많은 주문 데이터...
];

const OrderManagement: React.FC = () => {
    return (
        <OrderCard>
            <OrderHeader>
                <OrderTitle>주문 현황</OrderTitle>
                <OrderDate>최근 주문</OrderDate>
            </OrderHeader>
            <OrderList>
                {orders.map((order) => (
                    <OrderItem key={order.order_id}>
                        <OrderDetail>
                            <OrderInfo>주문 번호: {order.order_id}</OrderInfo>
                            <OrderInfo>총액: ₩{order.total_price}</OrderInfo>
                            <OrderInfo>
                                할인: ₩{order.discount_amount}
                            </OrderInfo>
                            <OrderInfo>주문 일자: {order.created_at}</OrderInfo>
                            <OrderStatus status={order.status}>
                                {order.status}
                            </OrderStatus>
                            <UserDetails>고객 ID: {order.user_id}</UserDetails>
                            <Address>배송지: {order.delivery_address}</Address>
                        </OrderDetail>
                        {order.order_details.map((detail) => (
                            <ProductDetail key={detail.product_id}>
                                <div>제품 ID: {detail.product_id}</div>
                                <div>가격: ₩{detail.price}</div>
                                <div>수량: {detail.quantity}</div>
                                <div>옵션: {detail.product_option}</div>
                            </ProductDetail>
                        ))}
                    </OrderItem>
                ))}
            </OrderList>
        </OrderCard>
    );
};

export default OrderManagement;
