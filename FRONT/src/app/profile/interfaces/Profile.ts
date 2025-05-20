import { User } from "../../auth/interfaces/User";
import { Post } from "../../home/interfaces/Post";

export interface Profile {
    _id: string;
    username: string;
    email: string;
    avatar: string | File | null;
    me: boolean;
    posts: Post[];
    subscriptions: User[];
    subscribers: User[];
    subscribed: boolean;
}