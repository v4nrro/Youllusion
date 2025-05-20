import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { UserLogin } from '../interfaces/User';
import { TokenResponse, UserResponse } from '../interfaces/responses';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    #authUrl = 'auth';
    #http = inject(HttpClient);
    #router = inject(Router);
    #logged: WritableSignal<boolean> = signal<boolean>(false);

    getLogged(): boolean {
        return this.#logged();
    }

    isLogged(): Observable<boolean> {
        const token = localStorage.getItem('token');

        if (!this.#logged() && !token) {
            return of(false);
        }

        if (this.#logged()) {
            return of(true);
        }

        if (!this.#logged() && token) {
            return this.checkToken().pipe(
                map(() => {
                    this.#logged.set(true);
                    return true;
                }),
                catchError(() => {
                    localStorage.removeItem('token');
                    this.#logged.set(false);
                    return of(false);
                })
            );
        }

        return of(false);
    }

    login(userLogin: UserLogin): Observable<TokenResponse> {
        return this.#http
            .post<TokenResponse>(`${this.#authUrl}/login`, userLogin)
            .pipe(
                map((tokenResponse) => {
                    localStorage.setItem('token', tokenResponse.token);
                    this.#logged.set(true);
                    return tokenResponse;
                })
            );
    }

    register(formData: FormData): Observable<TokenResponse> {
        return this.#http.post<TokenResponse>(
            `${this.#authUrl}/register`,
            formData
        );
    }

    getLoggedUser(): Observable<UserResponse> {
        return this.#http.get<UserResponse>(`users/me`)
        .pipe(map((resp) => { return resp }));
    }

    checkToken(): Observable<void> {
        return this.#http.get<void>(`${this.#authUrl}/validate`);
    }

    logout(): void {
        localStorage.removeItem('token');
        this.#logged.set(false);
        this.#router.navigate(['/']);
    }
}
