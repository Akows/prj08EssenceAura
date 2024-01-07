import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Admin, User } from '../components/admin/UserManagement';

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
    const [formData, setFormData] = useState<Partial<User> | Partial<Admin>>(
        {}
    );
    const [userType, setUserType] = useState<'user' | 'admin'>('user');

    useEffect(() => {
        if (user) {
            setFormData(user);
            setUserType('user_id' in user ? 'user' : 'admin');
        }
    }, [user]);

    // 타입 가드 함수: User 타입인지 확인
    const isUser = (data: User | Admin | null): data is User => {
        return (data as User).user_id !== undefined;
    };

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
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

                {/* 회원 유형 선택 드롭다운 */}
                {!user && (
                    <FormField>
                        <Label>회원 유형 선택</Label>
                        <select
                            name="userType"
                            onChange={(e) =>
                                setUserType(e.target.value as 'user' | 'admin')
                            }
                        >
                            <option value="user">일반 회원</option>
                            <option value="admin">관리자</option>
                        </select>
                    </FormField>
                )}

                {userType === 'user' ? (
                    // 일반 회원 폼 필드
                    <>
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
                        <FormField>
                            <Label>비밀번호</Label>
                            <Input
                                type="password"
                                name="password"
                                value={formData.password || ''}
                                onChange={handleChange}
                            />
                        </FormField>

                        {/* User 유형 전용 필드 */}
                        {isUser(formData) && (
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
                                <FormField>
                                    <Label>계정 활성 상태</Label>
                                    <select
                                        name="is_active"
                                        value={
                                            formData.is_active
                                                ? 'true'
                                                : 'false'
                                        }
                                        onChange={handleChange}
                                    >
                                        <option value="true">활성화</option>
                                        <option value="false">비활성화</option>
                                    </select>
                                </FormField>
                            </>
                        )}
                    </>
                ) : (
                    // 관리자 폼 필드
                    <>
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
                        <FormField>
                            <Label>비밀번호</Label>
                            <Input
                                type="password"
                                name="password"
                                value={formData.password || ''}
                                onChange={handleChange}
                            />
                        </FormField>
                        {/* 관리자 전용 필드 (필요한 경우) */}
                        {/* 예: 관리자 권한 레벨, 관리 영역 등 */}
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
