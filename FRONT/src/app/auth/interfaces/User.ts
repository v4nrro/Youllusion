export interface UserLogin {
    email: string;
    password: string;
}

export interface UserRegister {
    email: string;
    username: string;
    password: string;
    repeatPassword: string;
    avatar: File | null;
}