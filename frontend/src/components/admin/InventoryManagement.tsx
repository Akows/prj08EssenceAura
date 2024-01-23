import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import styled from 'styled-components';
import {
    addProduct,
    deleteProduct,
    fetchProducts,
    Product,
    updateProduct,
} from '../../redux/admin/adminThunks';
import LoadingModal from '../common/LoadingModal';
import InventoryModal from './InventoryModal';

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

const InventoryManagement: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error } = useSelector(
        (state: RootState) => state.admin
    );
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // 컴포넌트 마운트 시 상품 데이터 로드
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleAddProduct = (productData: Product) => {
        dispatch(addProduct(productData));
        closeModal();
    };

    const handleUpdateProduct = (productData: Product) => {
        if (editingProduct && editingProduct.product_id !== undefined) {
            dispatch(
                updateProduct({
                    id: editingProduct.product_id,
                    productData,
                })
            );
        }
        closeModal();
    };
    const handleDeleteProduct = (product_id: number) => {
        dispatch(deleteProduct(product_id));
    };

    const openAddModal = () => {
        setEditingProduct(null);
        setModalOpen(true);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setModalOpen(true);
    };

    const closeModal = () => {
        setEditingProduct(null);
        setModalOpen(false);
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
                                <TableCell>{product.createdAt}</TableCell>
                                <TableCell>
                                    {product.whatEvent ? '예' : '아니오'}
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
                                        onClick={() => {
                                            if (
                                                product.product_id !== undefined
                                            ) {
                                                handleDeleteProduct(
                                                    product.product_id
                                                );
                                            }
                                        }}
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
                    onSave={
                        editingProduct ? handleUpdateProduct : handleAddProduct
                    }
                />
            )}

            {loading && <LoadingModal />}
            {error && 'Error!'}
        </>
    );
};

export default InventoryManagement;
