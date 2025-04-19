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
    comments: Comment[];
}

export interface Author {
    _id: string;
    username: string;
    avatar: string;
}

export interface Comment {

}