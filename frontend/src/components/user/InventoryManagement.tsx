import React, { useState } from 'react';
import styled from 'styled-components';
import InventoryModal from './InventoryModal';

export interface Product {
    product_id: number;
    name: string;
    description: string;
    price: string; // 가격이 문자열 형식으로 제공되므로 string 타입으로 지정
    category: string;
    tags: string; // 태그는 콤마로 구분된 문자열로 가정
    stock: number;
    image_url: string;
    created_at: string; // 생성 날짜를 문자열 형식으로 가정
    is_event: boolean;
    discount_rate: number;
}

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

const AddProductButton = styled.button`
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 20px; // 버튼과 테이블 사이의 간격

    &:hover {
        background-color: #45a049;
    }
`;

const ActionButton = styled.button`
    padding: 5px 10px;
    margin: 0 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f0f0f0;
    cursor: pointer;

    &:hover {
        background-color: #e4e4e4;
    }

    &.edit {
        color: #4caf50;
    }

    &.delete {
        color: #f44336;
    }
`;

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

const InventoryManagement: React.FC = () => {
    // 모달 상태 관리
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const saveProduct = (productData: Partial<Product>) => {
        alert('저장할 제품:' + productData);
        // TODO: API 호출로 제품 정보를 업데이트하는 로직 구현
        closeModal();
    };

    const openAddModal = () => {
        setEditingProduct(null); // 새 제품 추가 시 null을 editingProduct로 설정
        setModalOpen(true);
    };

    const closeModal = () => {
        setEditingProduct(null);
        setModalOpen(false);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product); // 수정할 제품 설정
        setModalOpen(true);
    };

    const deleteProduct = (product_id: number) => {
        // TODO: API 호출로 제품을 삭제하는 로직 구현
        alert(`제품 ID ${product_id} 삭제`);
    };

    return (
        <>
            <InventoryCard>
                <InventoryHeader>
                    <InventoryTitle>재고 현황</InventoryTitle>
                    <AddProductButton onClick={openAddModal}>
                        제품 추가
                    </AddProductButton>
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
                            <TableHeader>제품 관리</TableHeader>
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
                                <TableCell>
                                    <ActionButton
                                        className="edit"
                                        onClick={() => openEditModal(product)}
                                    >
                                        수정
                                    </ActionButton>
                                    <ActionButton
                                        className="delete"
                                        onClick={() =>
                                            deleteProduct(product.product_id)
                                        }
                                    >
                                        삭제
                                    </ActionButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </InventoryTable>
            </InventoryCard>

            {/* 제품 추가/수정 모달 */}
            {isModalOpen && (
                <InventoryModal
                    product={editingProduct}
                    onClose={closeModal}
                    onSave={saveProduct}
                />
            )}
        </>
    );
};

export default InventoryManagement;
