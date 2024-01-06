import React from 'react';
import styled from 'styled-components';

const InventoryCard = styled.div`
    background: white;
    border: 1px solid #ddd;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InventoryHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const InventoryTitle = styled.h2`
    font-size: 18px;
    color: #333;
`;

const InventoryTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    table-layout: auto; // 테이블 레이아웃을 자동으로 설정
`;

const TableHeader = styled.th`
    background-color: #f3f3f3;
    color: #333;
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left; // 텍스트 왼쪽 정렬
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #fafafa;
    }
`;

const TableCell = styled.td`
    padding: 10px;
    border: 1px solid #ddd;
    color: #666;
    text-align: left; // 텍스트 왼쪽 정렬
`;

const InventoryManagement: React.FC = () => {
    // 임시 데이터
    const products = [
        {
            product_id: 1,
            name: '에센스 오일',
            description: '피부에 좋은 천연 오일',
            price: '₩19,000',
            category: '스킨케어',
            tags: '천연, 오일',
            stock: 15,
            image_url: 'https://via.placeholder.com/150',
            created_at: '2024-01-07',
            is_event: true,
            discount_rate: 10,
        },
        // ... 더 많은 제품 데이터 ...
    ];

    return (
        <InventoryCard>
            <InventoryHeader>
                <InventoryTitle>재고 현황</InventoryTitle>
                {/* 필요한 경우 다른 헤더 요소들 */}
            </InventoryHeader>
            <InventoryTable>
                <thead>
                    <tr>
                        <TableHeader>제품 ID</TableHeader>
                        <TableHeader>이름</TableHeader>
                        <TableHeader>가격</TableHeader>
                        <TableHeader>카테고리</TableHeader>
                        <TableHeader>재고</TableHeader>
                        <TableHeader>등록 날짜</TableHeader>
                        <TableHeader>이벤트 상품</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <TableRow key={product.product_id}>
                            <TableCell>{product.product_id}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.category}</TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell>{product.created_at}</TableCell>
                            <TableCell>
                                {product.is_event ? '예' : '아니오'}
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </InventoryTable>
        </InventoryCard>
    );
};

export default InventoryManagement;
