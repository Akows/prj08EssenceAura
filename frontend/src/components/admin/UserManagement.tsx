import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAdmin } from '../../hooks/admin/useAdmin';
import { Admin, User } from '../../type/admintypes';
import AlertConfirmModal from '../common/AlertConfirmModal';
import LoadingModal from '../common/LoadingModal';
import UserAdminFormModal from './UserAdminFormModal';
import UserAdminList from './UserAdminList';
import UserList from './UserList';

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

const UserManagement: React.FC = () => {
    const {
        loading,
        error,
        users,
        admins,
        fetchAllUsersHandler,
        fetchAllAdminsHandler,
        updateUserHandler,
        deactivateUserHandler,
        createAdminHandler,
        updateAdminHandler,
        deleteAdminHandler,
    } = useAdmin();

    // 현재 활성화된 탭을 관리하는 상태 ('user' 또는 'admin')
    const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');

    // 모달 창의 열림/닫힘 상태를 관리하는 상태
    const [isModalOpen, setModalOpen] = useState(false);

    // 편집 중인 사용자 또는 관리자 객체를 저장하는 상태
    const [editingUser, setEditingUser] = useState<User | Admin | null>(null);

    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    useEffect(() => {
        if (error) {
            setIsErrorModalOpen(true); // 에러가 있을 경우 모달 창을 엽니다.
        }
    }, [error]);

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);

    const handleCreateAdmin = () => {
        setEditingUser(null);
        handleModalOpen();
    };

    const handleEditAdmin = (admin: Admin) => {
        setEditingUser(admin);
        handleModalOpen();
    };

    const handleDeleteUser = (userId: number) => {
        deactivateUserHandler(userId);
        // 다른 처리가 필요할 수 있음
    };

    const handleDeleteAdmin = (adminId: number) => {
        deleteAdminHandler(adminId);
        // 다른 처리가 필요할 수 있음
    };

    const handleTabChange = (tab: 'user' | 'admin') => setActiveTab(tab);

    const handleCloseErrorModal = () => {
        setIsErrorModalOpen(false);
    };

    return (
        <div>
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

                    {activeTab === 'user' ? (
                        <div>
                            <AddUserButtonStyled>비활성화</AddUserButtonStyled>
                        </div>
                    ) : (
                        <div>
                            <AddUserButtonStyled onClick={handleCreateAdmin}>
                                관리자 추가
                            </AddUserButtonStyled>
                        </div>
                    )}
                </UserHeader>
                <UserTable>
                    <thead>
                        {activeTab === 'user' ? (
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
                        ) : (
                            <tr>
                                <TableHeader>ID</TableHeader>
                                <TableHeader>이름</TableHeader>
                                <TableHeader>이메일</TableHeader>
                                <TableHeader>계정 생성 날짜</TableHeader>
                                <TableHeader>관리</TableHeader>
                            </tr>
                        )}
                    </thead>
                    {activeTab === 'user' ? (
                        <UserList
                            users={users}
                            onDelete={handleDeleteUser}
                            fetchAllUsersHandler={fetchAllUsersHandler}
                            loading={loading}
                        />
                    ) : (
                        <UserAdminList
                            admins={admins}
                            onEdit={handleEditAdmin}
                            onDelete={handleDeleteAdmin}
                            fetchAllAdminsHandler={fetchAllAdminsHandler}
                            loading={loading}
                        />
                    )}
                </UserTable>
            </UserCard>

            {isModalOpen && (
                <UserAdminFormModal
                    admin={editingUser as Admin}
                    onClose={handleModalClose}
                    onSave={createAdminHandler}
                />
            )}

            {/* 에러 모달 창 */}
            {isErrorModalOpen && (
                <AlertConfirmModal
                    title="에러"
                    onClose={handleCloseErrorModal}
                    showConfirmButton={false}
                >
                    <p>{error}</p>
                </AlertConfirmModal>
            )}

            {loading && <LoadingModal />}
        </div>
    );
};

export default UserManagement;
