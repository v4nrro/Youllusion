export interface UserLogin {
    email: string;
    password: string;
}

export interface User {
    _id: string;
    email: string;
    username: string;
    password: string;
    repeatPassword: string;
    avatar: File | null;
}