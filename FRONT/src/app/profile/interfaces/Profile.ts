import { User } from "../../auth/interfaces/User";
import { Post } from "../../home/interfaces/Post";

export interface Profile {
    _id: string;
    username: string;
    avatar: string;
    me: boolean;
    posts: Post[];
    subscriptions: User[];
    subscribers: User[];
}