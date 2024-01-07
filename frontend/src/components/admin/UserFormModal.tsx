import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { User } from './UserManagement';

interface UserFormModalProps {
    user?: User;
    onClose: () => void;
    onSave: (userData: Partial<User>) => void;
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

const UserFormModal: React.FC<UserFormModalProps> = ({
    user,
    onClose,
    onSave,
}) => {
    const [formData, setFormData] = useState<Partial<User>>({});

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                <h2>{user ? '회원 정보 수정' : '회원 추가'}</h2>
                <FormField>
                    <Label>이름</Label>
                    <Input
                        name="username"
                        value={formData.username || ''}
                        onChange={handleChange}
                    />
                </FormField>
                <FormField>
                    <Label>이메일</Label>
                    <Input
                        name="email"
                        value={formData.email || ''}
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
                    <ActionButton className="save" onClick={handleSave}>
                        저장
                    </ActionButton>
                    <ActionButton className="cancel" onClick={onClose}>
                        취소
                    </ActionButton>
                </FormField>
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

export default UserFormModal;
