import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CommentsResponse, PostsResponse, SinglePostResponse } from '../interfaces/responses';
import { Post, SingleComment } from '../interfaces/Post';
import { User } from '../../auth/interfaces/User';
import { SubscriptionsResponse } from '../../auth/interfaces/responses';

@Injectable({
  providedIn: 'root',
})

export class HomeService {
    #homeUrl = 'posts';
    #http = inject(HttpClient);

    getPosts(): Observable<Post[]> {
        return this.#http.get<PostsResponse>(`${this.#homeUrl}`).pipe(
            map((resp) => {
                return resp.posts;
            })
        );
    }

    getLikedPosts(): Observable<Post[]> {
        return this.#http.get<PostsResponse>(`${this.#homeUrl}/liked`).pipe(
            map((resp) => {
                return resp.posts;
            })
        );
    }

    getSubscriptions(): Observable<User[]> {
        return this.#http.get<SubscriptionsResponse>(`users/subscriptions`).pipe(
            map((resp) => {
                return resp.subscriptions;
            })
        );
    }

    getPost(id: string): Observable<Post> {
        return this.#http.get<SinglePostResponse>(`${this.#homeUrl}/${id}`).pipe(
            map((resp) => {
                return resp.post
            })
        )
    }

    getComments(id: string): Observable<SingleComment[]> {
        return this.#http.get<CommentsResponse>(`comments/${id}`).pipe(
            map((resp) => {
                return resp.comments;
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
