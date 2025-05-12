import { User } from "./User";

export interface TokenResponse {
    token: string;
}

export interface UserResponse {
    message: string;
    user: User;
}

export interface UsersResponse {
    message: string;
    users: User[];
}

export interface SubscriptionsResponse {
    message: string;
    subscriptions: User[];
}