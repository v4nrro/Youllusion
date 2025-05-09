export interface UserLogin {
    email: string;
    password: string;
}

export interface User {
    email: string;
    username: string;
    password: string;
    repeatPassword: string;
    avatar: File | null;
}