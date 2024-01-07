import React, { useState } from 'react';
import styled from 'styled-components';
import { Admin, User } from './UserManagement';

interface UserModalProps {
    user: User | Admin | null;
    onClose: () => void;
    onSave: (userData: Partial<User | Admin>) => void;
}

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalBody = styled.div`
    background: white;
    padding: 30px;
    border-radius: 8px;
    width: 50%; // 모달의 너비
    max-width: 500px;
    z-index: 1001;
`;

const CloseButton = styled.button`
    float: right;
    border: none;
    background: none;
    font-size: 1.5em;
    cursor: pointer;
`;

const FormField = styled.div`
    margin-bottom: 10px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
`;

const Input = styled.input`
    width: 95%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const ActionButton = styled.button`
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &.save {
        background-color: #4caf50;
        color: white;
        margin-right: 10px;
    }

    &.cancel {
        background-color: #f44336;
        color: white;
    }
`;

const UserModal: React.FC<UserModalProps> = ({ user, onClose, onSave }) => {
    // User와 Admin에 따라 다른 상태 유형을 관리
    const [formData, setFormData] = useState<Partial<User> | Partial<Admin>>(
        user || {}
    );

    // 정보를 추가 혹은 수정하려는 대상이 누구인지를 판별하는 변수.
    const isUserType = (
        userData: Partial<User> | Partial<Admin>
    ): userData is Partial<User> => {
        return (userData as Partial<User>).user_id !== undefined;
    };
    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <ModalOverlay>
            <ModalBody>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <h2>{user ? '정보 수정' : '정보 추가'}</h2>
                {/* 공통 필드 */}
                <FormField>
                    <Label>이름</Label>
                    <Input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </FormField>
                <FormField>
                    <Label>이메일</Label>
                    <Input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </FormField>

                {/* User 유형에만 필요한 필드 */}
                {isUserType(formData) && (
                    <>
                        <FormField>
                            <Label>주소</Label>
                            <Input
                                name="address"
                                value={formData.address || ''}
                                onChange={handleChange}
                            />
                        </FormField>
                        <FormField>
                            <Label>전화번호</Label>
                            <Input
                                name="phone_number"
                                value={formData.phone_number || ''}
                                onChange={handleChange}
                            />
                        </FormField>
                        {/* ...기타 User 특화 필드... */}
                    </>
                )}

                <FormField>
                    <ActionButton className="save" onClick={handleSave}>
                        저장
                    </ActionButton>
                    <ActionButton className="cancel" onClick={onClose}>
                        취소
                    </ActionButton>
                </FormField>
            </ModalBody>
        </ModalOverlay>
    );
};

export default UserModal;
