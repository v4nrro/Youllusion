import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Profile } from '../interfaces/Profile';
import { ProfileResponse } from '../interfaces/responses';

@Injectable({
    providedIn: 'root',
})
export class ProfileService {
    #profileUrl = 'users';
    #http = inject(HttpClient);

    getProfile(id: string): Observable<Profile> {
        return this.#http
            .get<ProfileResponse>(`${this.#profileUrl}/${id}`)
            .pipe(
                map((resp) => {
                    return resp.user;
                })
            );
    }

    addOrRemoveSubscription(id: string): Observable<Profile> {
        return this.#http
            .post<ProfileResponse>(`${this.#profileUrl}/subscribe/${id}`, {})
            .pipe(
                map((resp) => {
                    return resp.user;
                })
            );
    }

    editAvatar(avatar: FormData): Observable<Profile> {
        return this.#http
            .put<ProfileResponse>(`${this.#profileUrl}/me/avatar`, avatar)
            .pipe(
                map((resp) => {
                    return resp.user;
                })
            );
    }

    editCredentials(credentials: Object): Observable<Profile> {
        return this.#http
            .put<ProfileResponse>(
                `${this.#profileUrl}/me/credentials`,
                credentials
            )
            .pipe(
                map((resp) => {
                    return resp.user;
                })
            );
    }

    editPassword(password: Object): Observable<Profile> {
        return this.#http
            .put<ProfileResponse>(
                `${this.#profileUrl}/me/password`,
                password
            )
            .pipe(
                map((resp) => {
                    return resp.user;
                })
            );
    }

    deleteMyAccount(): Observable<void> {
        return this.#http.delete<void>(`${this.#profileUrl}/me`)
    }
}
