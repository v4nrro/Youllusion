export interface Post {
    _id: string;
    title: string;
    description: string;
    author: string | null;
    date: string;
    post: string; 
    miniature: string;
    price: number;
    tags: string[];
    likes: string[];
    dislikes: string[];
    comments: any[];
}