import { Post } from "./Post";

export interface PostsResponse {
    message: string;
    posts: Post[];
}

export interface SinglePostResponse {
    message: string;
    post: Post;
}