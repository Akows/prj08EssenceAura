import { useState, useEffect } from 'react';
import {
    getUserInfoInformation,
    updateUserInfoInformation,
} from '../../services/userService';
import { UserInfo, UserUpdateInfo } from '../../type/usertypes';

export const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState<UserInfo>({
        userId: 0,
        username: '?',
        email: '',
        address: '',
        buildingName: '',
        unitNumber: '',
        phoneNumber: '',
        createdAt: '',
        isVerified: false,
    });
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

    useEffect(() => {
        const fetchUserInfo = async () => {
            setIsLoading(true); // 데이터 로드 시작
            try {
                const response = await getUserInfoInformation();
                setUserInfo(response.data);
            } catch (error) {
                // 오류 처리
            } finally {
                setIsLoading(false); // 로드 완료
            }
        };

        fetchUserInfo();
    }, []);

    const updateUserInfo = async (newUserInfo: UserUpdateInfo) => {
        setIsLoading(true); // 업데이트 시작
        try {
            const response = await updateUserInfoInformation(newUserInfo);
            setUserInfo(response.data);
            // 성공 메시지 또는 처리
        } catch (error) {
            // 오류 처리
        } finally {
            setIsLoading(false); // 업데이트 완료
        }
    };

    return { userInfo, setUserInfo, updateUserInfo, isLoading };
};
