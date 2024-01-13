import React, { useState } from 'react';
import styled from 'styled-components';
import OrderModal from './OrderModal';

export interface Order {
    order_id: number;
    user_id: string;
    total_price: number;
    discount_amount: number;
    delivery_address: string;
    status: string;
    created_at: string;
    order_details: OrderDetail[];
}

export interface OrderDetail {
    product_id: string;
    price: number;
    quantity: number;
    product_option: string;
}

const OrderTable = styled.table`
    @media (max-width: 768px) {
        // 모바일 화면에서 테이블의 레이아웃을 변경
        thead {
            display: none; // 테이블 헤더 숨김
        }
        tbody,
        tr {
            display: block; // 테이블 본문과 행을 블록 요소로 변경
        }
        tr {
            margin-bottom: 15px; // 각 행의 하단 마진 추가
        }
        td {
            display: block; // 셀을 블록 요소로 변경
            text-align: left;
            padding-left: 5px;
            position: relative; // 상대 위치 설정

            &::before {
                content: attr(data-label); // data-label 속성의 텍스트 표시
                position: absolute;
                left: 0;
                width: 50%; // 레이블의 너비를 50%로 설정
                padding-left: 10px; // 레이블의 왼쪽 패딩
                white-space: nowrap; // 레이블 텍스트는 줄바꿈 없이 한 줄로 표시
                text-align: left; // 텍스트를 왼쪽 정렬
            }
        }
    }
`;

const TableHeader = styled.th`
    background-color: #f3f3f3;
    color: #333;
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #fafafa;
    }
`;

const TableCell = styled.td`
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
    /* white-space: nowrap; // 텍스트를 줄바꿈 없이 한 줄로 표시
    overflow: hidden; // 셀 내용이 너무 길면 숨김
    text-overflow: ellipsis; // 내용이 넘칠 때 말줄임표 표시
    min-width: 100px; // 셀의 최소 너비 설정 */
`;

const ActionButton = styled.button`
    padding: 5px 10px;
    margin-right: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #e4e4e4;
    }

    &.edit {
        color: #4caf50;
    }

    &.cancel {
        color: #f44336;
    }
`;

const TableCellActions = styled(TableCell)`
    text-align: center;
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
            {
                product_id: 'prod_203',
                price: 17000,
                quantity: 1,
                product_option: 'Black',
            },
        ],
    },
    {
        order_id: 2,
        user_id: 'user_103',
        total_price: 45000,
        discount_amount: 5000,
        delivery_address: '서울시 강남구 테헤란로',
        status: '처리중',
        created_at: '2024-01-05',
        order_details: [
            {
                product_id: 'prod_201',
                price: 30000,
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
    // 모달의 표시 여부를 결정하는 상태
    const [isModalOpen, setModalOpen] = useState(false);
    // 수정할 주문의 상태
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    // 주문 수정 모달을 열기 위한 함수
    const openEditModal = (order: Order) => {
        setSelectedOrder(order);
        setModalOpen(true);
    };

    // 주문 수정 모달을 닫기 위한 함수
    const closeEditModal = () => {
        setSelectedOrder(null);
        setModalOpen(false);
    };

    // 주문 저장 로직
    const saveOrder = (order: Order) => {
        alert('저장할 주문:' + order);
        // TODO: API 호출로 주문 정보를 업데이트하는 로직 구현
        closeEditModal(); // 저장 후 모달 닫기
    };

    // 주문을 취소하는 함수
    const handleCancel = (orderId: number) => {
        alert(`주문 번호 ${orderId} 취소하기`);
        // TODO: 여기에 실제 주문 취소 로직 구현
    };

    return (
        <>
            <OrderTable>
                <thead>
                    <TableRow>
                        <TableHeader>주문 ID</TableHeader>
                        <TableHeader>고객 ID</TableHeader>
                        <TableHeader>총액</TableHeader>
                        <TableHeader>할인액</TableHeader>
                        <TableHeader>배송지</TableHeader>
                        <TableHeader>주문 상태</TableHeader>
                        <TableHeader>주문 날짜</TableHeader>
                        <TableHeader>제품 상세</TableHeader>
                        <TableHeader>상태 관리</TableHeader>
                    </TableRow>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <React.Fragment key={order.order_id}>
                            <TableRow>
                                <TableCell>{order.order_id}</TableCell>
                                <TableCell>{order.user_id}</TableCell>
                                <TableCell>₩{order.total_price}</TableCell>
                                <TableCell>₩{order.discount_amount}</TableCell>
                                <TableCell>{order.delivery_address}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>{order.created_at}</TableCell>
                                <TableCell>
                                    {order.order_details.map(
                                        (detail, index) => (
                                            <div key={detail.product_id}>
                                                {index > 0 && <hr />}
                                                제품 ID: {detail.product_id},
                                                가격: ₩{detail.price}, 수량:{' '}
                                                {detail.quantity}, 옵션:{' '}
                                                {detail.product_option}
                                            </div>
                                        )
                                    )}
                                </TableCell>
                                <TableCellActions>
                                    <ActionButton
                                        className="edit"
                                        onClick={() => openEditModal(order)}
                                    >
                                        수정
                                    </ActionButton>
                                    <ActionButton
                                        className="cancel"
                                        onClick={() =>
                                            handleCancel(order.order_id)
                                        }
                                    >
                                        취소
                                    </ActionButton>
                                </TableCellActions>
                            </TableRow>
                        </React.Fragment>
                    ))}
                </tbody>
            </OrderTable>
            {isModalOpen && selectedOrder && (
                <OrderModal
                    order={selectedOrder}
                    onClose={closeEditModal}
                    onSave={saveOrder}
                />
            )}
        </>
    );
};

export default OrderManagement;
