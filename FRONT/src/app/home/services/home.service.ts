import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PostsResponse, SinglePostResponse } from '../interfaces/responses';
import { Post } from '../interfaces/Post';

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

    getPost(id: string): Observable<Post> {
        return this.#http.get<SinglePostResponse>(`${this.#homeUrl}/${id}`).pipe(
            map((resp) => {
                return resp.post
            })
        )
    }
}
