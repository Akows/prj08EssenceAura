import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Admin } from '../../type/admintypes';
import AlertConfirmModal from '../common/AlertConfirmModal';

interface UserAdminListProps {
    admins: Admin[];
    onEdit: (admin: Admin) => void;
    onDelete: (adminId: number) => void;
    fetchAllAdminsHandler: () => Promise<void>;
    loading: boolean;
}

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

// 관리자 목록을 렌더링하는 컴포넌트
const UserAdminList: React.FC<UserAdminListProps> = ({
    admins,
    onEdit,
    onDelete,
    fetchAllAdminsHandler,
    loading,
}) => {
    useEffect(() => {
        fetchAllAdminsHandler();
    }, [fetchAllAdminsHandler]);

    useEffect(() => {
        if (loading) {
            fetchAllAdminsHandler();
        }
    }, [loading, fetchAllAdminsHandler]);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedAdminId, setSelectedAdminId] = useState<number | null>(null);

    const handleDeleteButtonClick = (adminId: number) => {
        setSelectedAdminId(adminId);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedAdminId !== null) {
            onDelete(selectedAdminId);
            setIsDeleteModalOpen(false);
        }
    };

    return (
        <tbody>
            {admins.map((admin) => (
                <TableRow key={admin.admin_id}>
                    <TableCell>{admin.admin_id}</TableCell>
                    <TableCell>{admin.username}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>{admin.created_at}</TableCell>
                    <TableCell>
                        <ActionButton
                            className="edit"
                            onClick={() => onEdit(admin)}
                        >
                            수정
                        </ActionButton>
                        <ActionButton
                            className="delete"
                            onClick={() =>
                                handleDeleteButtonClick(
                                    admin.admin_id as number
                                )
                            }
                        >
                            삭제
                        </ActionButton>
                    </TableCell>
                </TableRow>
            ))}

            {/* 삭제 확인 모달 */}
            {isDeleteModalOpen && (
                <AlertConfirmModal
                    title="관리자 삭제 확인"
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleDeleteConfirm}
                >
                    <p>정말로 이 관리자를 삭제하시겠습니까?</p>
                </AlertConfirmModal>
            )}
        </tbody>
    );
};

export default UserAdminList;
