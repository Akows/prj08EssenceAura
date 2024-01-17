import React, { useState } from 'react';
import styled from 'styled-components';
import { useUserInfo } from '../../hooks/user/useUserInfo';
import LoadingModal from '../common/LoadingModal';

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin-top: 15px;
`;

const Input = styled.input`
    padding: 8px;
    margin-top: 5px;
`;

const Button = styled.button`
    padding: 10px 15px;
    margin-top: 20px;
    background-color: #e44d26;
    color: white;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: #f55f3b;
    }
`;

const EditButton = styled(Button)`
    background-color: #f0ad4e;
    &:hover {
        background-color: #f5c069;
    }
`;

const SectionTitle = styled.h2`
    padding-top: 20px;
    border-top: 1px solid #ddd;
    margin-top: 20px;
`;

const UserInfoForm: React.FC = () => {
    const { userInfo, setUserInfo, updateUserInfo, isLoading } = useUserInfo();
    const [isEditMode, setIsEditMode] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await updateUserInfo(userInfo);
            alert('정보가 업데이트 되었습니다.');
            setIsEditMode(false); // 수정이 완료되면 조회 모드로 전환
        } catch (error) {
            alert('정보 업데이트 중 오류가 발생했습니다.');
            console.error(error);
        }
    };

    const handleEditClick = () => {
        setIsEditMode(true);
    };

    const handleCancelClick = () => {
        setIsEditMode(false);
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <SectionTitle>회원정보</SectionTitle>
                {isEditMode ? (
                    <>
                        <Label htmlFor="username">이름</Label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            value={userInfo.username || ''}
                            onChange={handleChange}
                        />

                        <Label htmlFor="address">주소</Label>
                        <Input
                            id="address"
                            name="address"
                            type="text"
                            value={userInfo.address || ''}
                            onChange={handleChange}
                        />

                        <Label htmlFor="buildingName">건물명</Label>
                        <Input
                            id="building_name"
                            name="building_name"
                            type="text"
                            value={userInfo.building_name || ''}
                            onChange={handleChange}
                        />

                        <Label htmlFor="phone_number">전화번호</Label>
                        <Input
                            id="phone_number"
                            name="phone_number"
                            type="text"
                            value={userInfo.phone_number || ''}
                            onChange={handleChange}
                        />

                        <Button type="submit">수정완료</Button>
                        <Button type="button" onClick={handleCancelClick}>
                            취소
                        </Button>
                    </>
                ) : (
                    <>
                        <div>이름: {userInfo.username}</div>
                        <div>이메일: {userInfo.email}</div>
                        <div>주소: {userInfo.address}</div>
                        <div>건물명: {userInfo.building_name}</div>
                        <div>전화번호: {userInfo.phone_number}</div>

                        <EditButton type="button" onClick={handleEditClick}>
                            수정하기
                        </EditButton>
                    </>
                )}
            </Form>

            {isLoading && <LoadingModal />}
        </>
    );
};

export default UserInfoForm;
