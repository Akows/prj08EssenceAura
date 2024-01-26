import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
    getUserInfoInformation,
    updateUserInfoInformation,
} from '../../services/userService';
import { UserInfo, UserUpdateInfo } from '../../type/usertypes';

export const useUserInfo = () => {
    const [userInfo, setUserInfo] = useState<UserInfo>({
        userId: 0,
        username: '',
        email: '',
        address: '',
        building_name: '',
        unitNumber: '',
        phone_number: '',
        createdAt: '',
        isVerified: false,
    });
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
    const accessToken = useSelector(
        (state: RootState) => state.auth.accessToken
    );

    useEffect(() => {
        const fetchUserInfo = async () => {
            setIsLoading(true); // 데이터 로드 시작
            try {
                const response = await getUserInfoInformation(accessToken);
                setUserInfo(response[0]);
            } catch (error) {
                // 오류 처리
            } finally {
                setIsLoading(false); // 로드 완료
            }
        };

        fetchUserInfo();
    }, [accessToken]); // accessToken을 의존성 배열에 추가

    const updateUserInfo = async (newUserInfo: UserUpdateInfo) => {
        setIsLoading(true); // 업데이트 시작
        try {
            await updateUserInfoInformation(newUserInfo, accessToken);
        } catch (error) {
            // 오류 처리
        } finally {
            setIsLoading(false); // 업데이트 완료
        }
    };

    return { userInfo, setUserInfo, updateUserInfo, isLoading };
};
