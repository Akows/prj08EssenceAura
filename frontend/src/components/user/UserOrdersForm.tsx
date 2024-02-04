import React from 'react';
import styled from 'styled-components';
import { useUserInfo } from '../../hooks/user/useUserInfo';
import LoadingModal from '../common/LoadingModal';

const OrderListContainer = styled.div`
    padding: 20px;
`;

const OrderList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const OrderItem = styled.li`
    padding: 10px 0;
    border-bottom: 1px solid #eee;
`;

const SectionTitle = styled.h2`
    padding-top: 20px;
    border-top: 1px solid #ddd;
    margin-top: 20px;
`;

const ItemList = styled.div`
    margin-top: 10px;
    padding-left: 20px;
`;

const UserOrdersForm: React.FC = () => {
    const { userOrders, isLoading } = useUserInfo();

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
                                    <div>주문 번호: {order.order_id}</div>
                                    <div>총 가격: {order.total_price}원</div>
                                    <ItemList>
                                        {order.order_items?.map((item) => (
                                            <div key={item.product_id}>
                                                <div>
                                                    제품 ID: {item.product_id}
                                                </div>
                                                <div>수량: {item.quantity}</div>
                                                <div>가격: {item.price}원</div>
                                            </div>
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
