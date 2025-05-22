import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
    CommentsResponse,
    PostsResponse,
    SinglePostResponse,
} from '../interfaces/responses';
import { Post, SingleComment } from '../interfaces/Post';
import { User } from '../../auth/interfaces/User';
import { SubscriptionsResponse } from '../../auth/interfaces/responses';

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    #homeUrl = 'posts';
    #http = inject(HttpClient);

    getPosts(page: number, limit: number, search: string, filter: string): Observable<PostsResponse> {
        const params = new URLSearchParams({
            page: String(page),
            limit: String(limit),
            search,
            filter
        });

        return this.#http
            .get<PostsResponse>(`${this.#homeUrl}?${params.toString()}`)
            .pipe(
                map((resp) => {
                    return resp;
                })
            );
    }

    getMyPosts(): Observable<Post[]> {
        return this.#http.get<PostsResponse>(`${this.#homeUrl}`).pipe(
            map((resp) => {
                return resp.posts;
            })
        );
    }

    postPost(formData: FormData): Observable<Post> {
        return this.#http
            .post<SinglePostResponse>(`${this.#homeUrl}`, formData)
            .pipe(
                map((resp) => {
                    return resp.post;
                })
            );
    }

    putPost(formData: FormData, id: string): Observable<Post> {
        return this.#http
            .put<SinglePostResponse>(`${this.#homeUrl}/${id}`, formData)
            .pipe(
                map((resp) => {
                    return resp.post;
                })
            );
    }

    deletePost(id: string): Observable<void> {
        return this.#http.delete<void>(`${this.#homeUrl}/post-delete/${id}`);
    }

    getLikedPosts(): Observable<Post[]> {
        return this.#http.get<PostsResponse>(`${this.#homeUrl}/liked`).pipe(
            map((resp) => {
                return resp.posts;
            })
        );
    }

    getSubscriptions(): Observable<User[]> {
        return this.#http
            .get<SubscriptionsResponse>(`users/subscriptions`)
            .pipe(
                map((resp) => {
                    return resp.subscriptions;
                })
            );
    }

    getPost(id: string): Observable<Post> {
        return this.#http
            .get<SinglePostResponse>(`${this.#homeUrl}/${id}`)
            .pipe(
                map((resp) => {
                    return resp.post;
                })
            );
    }

    likePost(id: string): Observable<Post> {
        return this.#http.post<Post>(`${this.#homeUrl}/like/${id}`, {}).pipe(
            map((resp) => {
                return resp;
            })
        );
    }

    dislikePost(id: string): Observable<Post> {
        return this.#http.post<Post>(`${this.#homeUrl}/dislike/${id}`, {}).pipe(
            map((resp) => {
                return resp;
            })
        );
    }

    getComments(id: string): Observable<SingleComment[]> {
        return this.#http.get<CommentsResponse>(`comments/${id}`).pipe(
            map((resp) => {
                return resp.comments;
            })
        );
    }

    likeComment(id: string): Observable<Post> {
        return this.#http.post<Post>(`comments/like/${id}`, {}).pipe(
            map((resp) => {
                return resp;
            })
        );
    }

    dislikeComment(id: string): Observable<Post> {
        return this.#http.post<Post>(`comments/dislike/${id}`, {}).pipe(
            map((resp) => {
                return resp;
            })
        );
    }

    postComment(id: string, text: string): Observable<SingleComment> {
        return this.#http.post<SingleComment>(`comments/${id}`, { text }).pipe(
            map((resp) => {
                return resp;
            })
        );
    }
}
