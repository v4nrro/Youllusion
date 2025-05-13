export interface Post {
    _id: string;
    title: string;
    description: string;
    author: Author;
    date: string;
    post: string; 
    miniature: string;
    price: number;
    tags: string[];
    likes: string[];
    dislikes: string[];
    comments: SingleComment[];
}

export interface Author {
    _id: string;
    username: string;
    avatar: string;
}

export interface SingleComment {
    _id: string;
    author: Author;
    text: string;
    date: string;
    likes: string[];
    dislikes: string[];
    post: Post;
}