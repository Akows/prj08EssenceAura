// User 인터페이스 정의
export interface User {
    user_id: number;
    username: string;
    email: string;
    password: string;
    address: string;
    building_name?: string;
    unit_number?: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    is_member: boolean;
}

// Admin 인터페이스 정의
export interface Admin {
    admin_id: number;
    username: string;
    email: string;
    password: string;
    created_at: string;
    updated_at: string;
}
