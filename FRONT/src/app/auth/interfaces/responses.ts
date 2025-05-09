import { User } from "./User";

export interface TokenResponse {
    token: string;
}

export interface UserResponse {
    message: string;
    user: User;
}