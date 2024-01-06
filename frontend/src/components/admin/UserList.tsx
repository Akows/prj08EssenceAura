import styled from 'styled-components';
import { User } from './UserManagement';

interface UserListProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (userId: number) => void;
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
const UserList: React.FC<UserListProps> = ({ users, onEdit, onDelete }) => {
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
                        <ActionButton
                            className="edit"
                            onClick={() => onEdit(user)}
                        >
                            수정
                        </ActionButton>
                        <ActionButton
                            className="delete"
                            onClick={() => onDelete(user.user_id)}
                        >
                            삭제
                        </ActionButton>
                    </TableCell>
                </TableRow>
            ))}
        </tbody>
    );
};

export default UserList;
