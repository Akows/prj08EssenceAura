export interface UserInfo {
    userId: number;
    username: string;
    email: string;
    address: string;
    buildingName: string;
    unitNumber: string;
    phoneNumber: string;
    createdAt: string;
    isVerified: boolean;
}

export interface UserUpdateInfo {
    username: string;
    address: string;
    buildingName: string;
    unitNumber: string;
    phoneNumber: string;
}
