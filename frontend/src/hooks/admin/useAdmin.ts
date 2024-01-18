import { useState, useCallback } from 'react';
import {
    createAdmin,
    deactivateUser,
    deleteAdmin,
    getAllAdmins,
    getAllUsers,
    searchUserByEmail,
    updateAdmin,
    updateUser,
} from '../../services/adminService';
import { Admin, User } from '../../type/admintypes';

interface AdminHook {
    loading: boolean;
    error: string | null;
    users: User[];
    admins: Admin[];
    searchUsersByEmailHandler: (emailKeyword: string) => Promise<void>;
    fetchAllUsersHandler: () => Promise<void>;
    fetchAllAdminsHandler: () => Promise<void>;
    updateUserHandler: (userId: number, userData: User) => Promise<void>;
    deactivateUserHandler: (userId: number) => Promise<void>;
    createAdminHandler: (adminData: Admin) => Promise<void>;
    updateAdminHandler: (adminId: number, adminData: Admin) => Promise<void>;
    deleteAdminHandler: (adminId: number) => Promise<void>;
}

export const useAdmin = (): AdminHook => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);

    // 유저 목록 조회
    const fetchAllUsersHandler = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const data = await getAllUsers();
            console.log(data);
            setUsers(data[0]);
        } catch (err) {
            // 에러 객체인지 확인
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('알 수 없는 에러가 발생했습니다.');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    // 이메일로 유저 검색
    const searchUsersByEmailHandler = useCallback(
        async (emailKeyword: string) => {
            setLoading(true);
            setError('');
            try {
                const data = await searchUserByEmail(emailKeyword);
                setUsers(data); // 검색 결과를 users 상태에 저장
            } catch (err) {
                // 에러 객체인지 확인
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('알 수 없는 에러가 발생했습니다.');
                }
            } finally {
                setLoading(false);
            }
        },
        []
    );

    // 관리자 목록 조회
    const fetchAllAdminsHandler = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const data = await getAllAdmins();
            setAdmins(data);
        } catch (err) {
            // 에러 객체인지 확인
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('알 수 없는 에러가 발생했습니다.');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    // 유저 정보 업데이트
    const updateUserHandler = useCallback(
        async (userId: number, userData: User) => {
            setLoading(true);
            setError('');
            try {
                await updateUser(userId, userData);
                // 필요한 경우 상태 업데이트
            } catch (err) {
                // 에러 객체인지 확인
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('알 수 없는 에러가 발생했습니다.');
                }
            } finally {
                setLoading(false);
            }
        },
        []
    );

    // 유저 비활성화
    const deactivateUserHandler = useCallback(async (userId: number) => {
        setLoading(true);
        setError('');
        try {
            await deactivateUser(userId);
            // 필요한 경우 상태 업데이트
        } catch (err) {
            // 에러 객체인지 확인
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('알 수 없는 에러가 발생했습니다.');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    // 관리자 추가
    const createAdminHandler = useCallback(async (adminData: Admin) => {
        setLoading(true);
        setError('');
        try {
            await createAdmin(adminData);
            // 필요한 경우 상태 업데이트
        } catch (err) {
            // 에러 객체인지 확인
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('알 수 없는 에러가 발생했습니다.');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    // 관리자 정보 업데이트
    const updateAdminHandler = useCallback(
        async (adminId: number, adminData: Admin) => {
            setLoading(true);
            setError('');
            try {
                await updateAdmin(adminId, adminData);
                // 필요한 경우 상태 업데이트
            } catch (err) {
                // 에러 객체인지 확인
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('알 수 없는 에러가 발생했습니다.');
                }
            } finally {
                setLoading(false);
            }
        },
        []
    );

    // 관리자 삭제
    const deleteAdminHandler = useCallback(async (adminId: number) => {
        setLoading(true);
        setError('');
        try {
            await deleteAdmin(adminId);
            // 필요한 경우 상태 업데이트
        } catch (err) {
            // 에러 객체인지 확인
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('알 수 없는 에러가 발생했습니다.');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        users,
        admins,
        searchUsersByEmailHandler,
        fetchAllUsersHandler,
        fetchAllAdminsHandler,
        updateUserHandler,
        deactivateUserHandler,
        createAdminHandler,
        updateAdminHandler,
        deleteAdminHandler,
    };
};
