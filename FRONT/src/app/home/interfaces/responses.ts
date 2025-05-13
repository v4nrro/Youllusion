import { SingleComment, Post } from "./Post";

export interface PostsResponse {
    message: string;
    posts: Post[];
}

export interface SinglePostResponse {
    message: string;
    post: Post;
}

export interface CommentsResponse {
    message: string;
    comments: SingleComment[];
}