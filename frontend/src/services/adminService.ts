import { Admin, User } from '../type/admintypes';

// fetch 요청을 위한 공통 설정
const fetchOptions: RequestInit = {
    credentials: 'include', // HttpOnly 쿠키 포함
    headers: {
        'Content-Type': 'application/json',
    },
};

// 에러 처리 핸들러
const handleResponse = async (response: Response) => {
    if (response.ok) {
        return await response.json();
    }

    // 서버로부터의 응답이 성공적이지 않은 경우, 상태 코드에 따라 다르게 처리
    const errorData = await response.json();
    const errorMessage =
        errorData.message || '알 수 없는 서버 오류가 발생했습니다.';

    switch (response.status) {
        case 400:
            throw new Error(errorMessage || '잘못된 요청입니다.');
        case 401:
            throw new Error(errorMessage || '인증이 필요합니다.');
        case 403:
            throw new Error(errorMessage || '접근이 거부되었습니다.');
        case 404:
            throw new Error(errorMessage || '리소스를 찾을 수 없습니다.');
        case 500:
            throw new Error(errorMessage || '서버 내부 오류가 발생했습니다.');
        default:
            throw new Error(errorMessage);
    }
};

// 유저 검색 (이메일로 검색)
export const searchUserByEmail = async (emailKeyword: string) => {
    const response = await fetch(
        `${
            import.meta.env.VITE_API_URL
        }/admin/searchUser/search?email=${emailKeyword}`,
        {
            ...fetchOptions,
            method: 'GET',
        }
    );
    return await handleResponse(response);
};

// 전체 유저 목록 조회
export const getAllUsers = async () => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/getusers`,
        {
            ...fetchOptions,
            method: 'GET',
        }
    );
    return await handleResponse(response);
};

// 유저 정보 업데이트
export const updateUser = async (userId: number, userData: User) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/putusers/${userId}`,
        {
            ...fetchOptions,
            method: 'PUT',
            body: JSON.stringify(userData),
        }
    );
    return await handleResponse(response);
};

// 유저 비활성화
export const deactivateUser = async (userId: number) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/patchusers/${userId}/deactivate`,
        {
            ...fetchOptions,
            method: 'PATCH',
        }
    );
    return await handleResponse(response);
};

// 전체 관리자 목록 조회
export const getAllAdmins = async () => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/getadmins`,
        {
            ...fetchOptions,
            method: 'GET',
        }
    );
    return await handleResponse(response);
};

// 관리자 정보 추가
export const createAdmin = async (adminData: Admin) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/postadmins`,
        {
            ...fetchOptions,
            method: 'POST',
            body: JSON.stringify(adminData),
        }
    );
    return await handleResponse(response);
};

// 관리자 정보 업데이트
export const updateAdmin = async (adminId: number, adminData: Admin) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/putadmins/${adminId}`,
        {
            ...fetchOptions,
            method: 'PUT',
            body: JSON.stringify(adminData),
        }
    );
    return await handleResponse(response);
};

// 관리자 삭제
export const deleteAdmin = async (adminId: number) => {
    const response = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/deleteadmins/${adminId}`,
        {
            ...fetchOptions,
            method: 'DELETE',
        }
    );
    return await handleResponse(response);
};
