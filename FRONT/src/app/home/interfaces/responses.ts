import { Post } from "./Post";

export interface PostsResponse {
    message: string;
    posts: Post[];
}