export interface UserInfo {
    userId: number;
    username: string;
    email: string;
    address: string;
    building_name: string;
    unitNumber: string;
    phone_number: string;
    createdAt: string;
    isVerified: boolean;
}

export interface UserUpdateInfo {
    username: string;
    address: string;
    building_name: string;
    unitNumber: string;
    phone_number: string;
}
