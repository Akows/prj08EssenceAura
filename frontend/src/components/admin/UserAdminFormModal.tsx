import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Admin } from '../../type/admintypes';

interface AdminFormModalProps {
    admin?: Admin;
    onClose: () => void;
    onSave: (adminData: Partial<Admin>) => void;
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

const UserAdminFormModal: React.FC<AdminFormModalProps> = ({
    admin,
    onClose,
    onSave,
}) => {
    const [formData, setFormData] = useState<Partial<Admin>>({
        username: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        if (admin) {
            setFormData({
                username: admin.username,
                email: admin.email,
                password: admin.password,
            });
        } else {
            setFormData({
                username: '',
                email: '',
                password: '',
            });
        }
    }, [admin]);

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
                <h2>{admin ? '관리자 정보 수정' : '관리자 추가'}</h2>
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
export default UserAdminFormModal;
