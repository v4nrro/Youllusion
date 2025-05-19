import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Profile } from '../interfaces/Profile';
import { ProfileResponse } from '../interfaces/responses';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
    #profileUrl = 'users';
    #http = inject(HttpClient);

    getProfile(id: string): Observable<Profile> {
        return this.#http.get<ProfileResponse>(`${this.#profileUrl}/${id}`).pipe(
            map((resp) => {
                return resp.user;
            })
        )
    }

    addOrRemoveSubscription(id: string): Observable<Profile> {
        return this.#http.post<ProfileResponse>(`${this.#profileUrl}/subscribe/${id}`, {}).pipe(
            map((resp) => {
                return resp.user;
            })
        );
    }
}