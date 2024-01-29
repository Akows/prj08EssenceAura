import React, { useEffect } from 'react';
import styled from 'styled-components';
import { User } from '../../type/admintypes';

interface UserListProps {
    users: User[];
    onDelete: (userId: number) => void;
    fetchAllUsersHandler: () => Promise<void>;
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

// 일반 회원 목록을 렌더링하는 컴포넌트
const UserList: React.FC<UserListProps> = ({
    users,
    onDelete,
    fetchAllUsersHandler,
    loading,
}) => {
    useEffect(() => {
        fetchAllUsersHandler();
    }, [fetchAllUsersHandler]);

    useEffect(() => {
        if (loading) {
            fetchAllUsersHandler();
        }
    }, [loading, fetchAllUsersHandler]);

    const handleDelete = (user) => {
        const answer = window.confirm('사용자를 삭제하시겠습니까?');

        if (answer) {
            onDelete(user.user_id);
            alert('삭제되었습니다.');
        } else {
            alert('취소되었습니다.');
            return;
        }
    };

    return (
        <tbody>
            {users.map((user) => (
                <TableRow key={user.user_id}>
                    <TableCell>{user.user_id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.address || '-'}</TableCell>
                    <TableCell>{user.phone_number || '-'}</TableCell>
                    <TableCell>{user.created_at}</TableCell>
                    <TableCell>{user.is_active ? '활성' : '비활성'}</TableCell>
                    <TableCell>
                        {/* <ActionButton
                            className="edit"
                            onClick={() => console.log('수정모드로!')}
                        >
                            수정
                        </ActionButton> */}
                        <ActionButton className="delete" onClick={handleDelete}>
                            유저 삭제
                        </ActionButton>
                    </TableCell>
                </TableRow>
            ))}
        </tbody>
    );
};

export default UserList;
