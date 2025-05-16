import { Post } from "../../home/interfaces/Post";

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
    avatar: File | string | null;
    me: boolean;
    posts: Post[];
    subscriptions: User[];
    subscribers: User[];
    subscribed: boolean;
}