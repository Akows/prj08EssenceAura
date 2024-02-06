import React from 'react';
import styled from 'styled-components';
import { useUserInfo } from '../../hooks/user/useUserInfo';
import LoadingModal from '../common/LoadingModal';

const OrderListContainer = styled.div`
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 30px;
`;

const OrderItem = styled.li`
    padding: 15px;
    border-bottom: 1px solid #eee;
    &:last-child {
        border-bottom: none;
    }
`;

const OrderDetailHeader = styled.div`
    font-weight: bold;
    color: #333;
    background: #f8f9fa;
    padding: 10px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center; // 양쪽으로 내용을 분리합니다.
    align-items: center;
    margin-bottom: 20px; // 아이템 리스트와의 간격을 늘립니다.
    font-size: 1.1em;
`;

const OrderId = styled.span`
    margin-right: 10px; // 총 가격과의 간격을 주기 위한 마진입니다.
`;

const TotalPrice = styled.span`
    color: #e44d26;
    font-weight: bold;
    font-size: 1.2em;
`;

const OrderList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const SectionTitle = styled.h2`
    padding-top: 20px;
    border-top: 1px solid #ddd;
    margin-top: 20px;
    font-size: 24px;
    text-align: center;
    color: #333;
`;

const ItemList = styled.div`
    margin-top: 10px;
`;

const ItemDetail = styled.div`
    background: #f9f9f9; // 배경색을 통해 구분감을 줍니다.
    padding: 8px;
    margin-bottom: 5px; // 다음 아이템과의 간격을 줍니다.
    border-radius: 4px; // 모서리를 둥글게 합니다.
`;

const ItemLabel = styled.span`
    font-weight: bold;
`;

const UserOrdersForm: React.FC = () => {
    const { userOrders, isLoading } = useUserInfo();

    // 숫자를 포맷팅하는 함수
    const formatPrice = (price) => {
        return Math.floor(price).toLocaleString('ko-KR');
    };

    return (
        <OrderListContainer>
            {isLoading ? (
                <LoadingModal />
            ) : (
                <>
                    <SectionTitle>주문 내역</SectionTitle>
                    <OrderList>
                        {userOrders.length > 0 ? (
                            userOrders?.map((order) => (
                                <OrderItem key={order.order_id}>
                                    <OrderDetailHeader>
                                        <OrderId>
                                            주문 번호: {order.order_id}
                                        </OrderId>
                                        <TotalPrice>
                                            총 가격:{' '}
                                            {formatPrice(order.total_price)}원
                                        </TotalPrice>
                                    </OrderDetailHeader>
                                    <ItemList>
                                        {order.order_items?.map((item) => (
                                            <ItemDetail key={item.product_id}>
                                                <div>
                                                    <ItemLabel>
                                                        제품명:
                                                    </ItemLabel>{' '}
                                                    {item.product_name}
                                                </div>
                                                <div>
                                                    <ItemLabel>수량:</ItemLabel>{' '}
                                                    {item.quantity}개
                                                </div>
                                                <div>
                                                    <ItemLabel>가격:</ItemLabel>{' '}
                                                    {formatPrice(item.price)}원
                                                </div>
                                            </ItemDetail>
                                        ))}
                                    </ItemList>
                                </OrderItem>
                            ))
                        ) : (
                            <p>주문 내역이 없습니다.</p>
                        )}
                    </OrderList>
                </>
            )}
        </OrderListContainer>
    );
};

export default UserOrdersForm;
