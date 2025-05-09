import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { UserLogin, UserRegister } from '../interfaces/User';
import { TokenResponse } from '../interfaces/responses';

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

    register(userRegister: UserRegister): Observable<TokenResponse> {
        return this.#http.post<TokenResponse>(
            `${this.#authUrl}/register`,
            userRegister
        );
    }

    checkToken(): Observable<void> {
        return this.#http.get<void>(`${this.#authUrl}/validate`);
    }

    logout(): void {
        localStorage.removeItem('token');
        this.#logged.set(false);
        this.#router.navigate(['/home']);
    }
}
