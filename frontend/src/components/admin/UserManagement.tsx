import React, { useState } from 'react';
import styled from 'styled-components';
import UserAdminFormModal from './UserAdminFormModal';
import UserAdminList from './UserAdminList';
import UserFormModal from './UserFormModal';
import UserList from './UserList';

// User 인터페이스 정의
export interface User {
    user_id: number;
    username: string;
    email: string;
    password: string;
    address: string;
    building_name?: string;
    unit_number?: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    is_member: boolean;
}

// Admin 인터페이스 정의
export interface Admin {
    admin_id: number;
    username: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
}

const UserCard = styled.div`
    background: white;
    border: 1px solid #ddd;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const UserHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const UserTitle = styled.h2`
    font-size: 18px;
    color: #333;
`;

const UserTable = styled.table`
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

const AddUserButton = styled.button`
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

const AddUserButtonStyled = styled(AddUserButton)`
    background-color: #5cb85c; // 강조할 색상으로 변경
    &:hover {
        background-color: #4cae4c; // 호버 상태 색상 변경
    }
`;

// 목록 전환 버튼을 위한 새로운 스타일드 컴포넌트
const TabButton = styled(AddUserButton)`
    background-color: transparent; // 배경색을 투명하게
    color: #333; // 텍스트 색상
    border: 1px solid #ddd; // 테두리 색상

    &:hover {
        background-color: #e6e6e6; // 호버 상태 색상 변경
    }
`;

// 임시 데이터
const usersData = [
    {
        user_id: 1,
        username: 'user1',
        email: 'user1@example.com',
        password: 'hashed_password',
        address: '123 Main St',
        phone_number: '123-456-7890',
        created_at: '2021-01-01',
        updated_at: '2021-01-02',
        is_active: true,
        is_member: true,
    },
    // ... 추가 데이터 ...
];

// 임시 데이터
const adminsData = [
    {
        admin_id: 1,
        username: 'admin1',
        email: 'admin1@example.com',
        password: 'hashed_password',
        created_at: '2021-01-01',
        updated_at: '2021-01-02',
    },
    // ... 추가 데이터 ...
];

const UserManagement: React.FC = () => {
    const [activeTab, setActiveTab] = useState('user');

    // 유저 및 관리자 데이터 관리를 위한 상태
    const [users] = useState<User[]>(usersData); // 일반 회원 데이터 상태
    const [admins] = useState<Admin[]>(adminsData); // 관리자 데이터 상태
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | Admin | null>(null);

    // 모달 타입을 위한 상태 추가 ('user' | 'admin')
    const [modalType, setModalType] = useState<'user' | 'admin'>('user');

    const saveUser = (userData: Partial<User>) => {
        alert('저장할 회원:' + userData);
        // TODO: API 호출로 제품 정보를 업데이트하는 로직 구현
        closeModal();
    };

    const saveAdmin = (adminsData: Partial<Admin>) => {
        alert('저장할 관리자:' + adminsData);
        // TODO: API 호출로 제품 정보를 업데이트하는 로직 구현
        closeModal();
    };

    const openAddModal = (type: 'user' | 'admin') => {
        setEditingUser(null); // 새로운 회원 추가 시에는 editingUser를 비워둡니다.
        setModalType(type); // 모달 타입을 설정하는 상태 추가 필요
        setModalOpen(true);
    };

    const closeModal = () => {
        setEditingUser(null);
        setModalOpen(false);
    };

    const openEditModal = (user: User | Admin) => {
        setEditingUser(user); // 수정할 제품 설정
        setModalOpen(true);
    };

    const deleteUser = (product_id: number) => {
        // TODO: API 호출로 제품을 삭제하는 로직 구현
        alert(`제품 ID ${product_id} 삭제`);
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'user':
                return (
                    <UserList
                        users={users}
                        onEdit={openEditModal}
                        onDelete={deleteUser}
                    />
                );
            case 'admin':
                return (
                    <UserAdminList
                        admins={admins}
                        onEdit={openEditModal}
                        onDelete={deleteUser}
                    />
                );
            default:
                return <div>선택된 탭에 해당하는 정보가 없습니다.</div>;
        }
    };

    return (
        <>
            <UserCard>
                <UserHeader>
                    <UserTitle>회원 현황</UserTitle>
                    <div>
                        <TabButton onClick={() => handleTabChange('user')}>
                            회원 목록
                        </TabButton>
                        <TabButton onClick={() => handleTabChange('admin')}>
                            관리자 목록
                        </TabButton>
                    </div>
                    <div>
                        <AddUserButtonStyled
                            onClick={() => openAddModal('user')}
                        >
                            회원 추가
                        </AddUserButtonStyled>
                        <AddUserButtonStyled
                            onClick={() => openAddModal('admin')}
                        >
                            관리자 추가
                        </AddUserButtonStyled>
                    </div>
                </UserHeader>
                <UserTable>
                    <thead>
                        <tr>
                            <TableHeader>ID</TableHeader>
                            <TableHeader>이름</TableHeader>
                            <TableHeader>이메일</TableHeader>
                            <TableHeader>주소</TableHeader>
                            <TableHeader>전화번호</TableHeader>
                            <TableHeader>계정 생성 날짜</TableHeader>
                            <TableHeader>계정 상태</TableHeader>
                            <TableHeader>관리</TableHeader>
                        </tr>
                    </thead>
                    {renderContent()}
                </UserTable>
            </UserCard>

            {/* 회원 추가/수정 모달 */}
            {isModalOpen &&
                (modalType === 'user' ? (
                    <UserFormModal
                        user={editingUser as User} // 여기서 editingUser는 User 타입이라고 가정합니다.
                        onClose={() => setModalOpen(false)}
                        onSave={saveUser} // 일반 회원 데이터를 저장하는 함수
                    />
                ) : (
                    <UserAdminFormModal
                        admin={editingUser as Admin} // 여기서 editingUser는 Admin 타입이라고 가정합니다.
                        onClose={() => setModalOpen(false)}
                        onSave={saveAdmin} // 관리자 데이터를 저장하는 함수 (이 함수는 별도로 구현해야 합니다.)
                    />
                ))}
        </>
    );
};

export default UserManagement;
