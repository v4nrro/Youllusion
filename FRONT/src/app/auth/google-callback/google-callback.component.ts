import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'google-callback',
  imports: [],
  templateUrl: './google-callback.component.html',
  styleUrl: './google-callback.component.css'
})
export class GoogleCallbackComponent {
    #route = inject(ActivatedRoute);
    #router = inject(Router);

    constructor() {
        this.#route.queryParams.subscribe(params => {
            const token = params['token'];

            if (token) {
                localStorage.setItem('token', token);
                this.#router.navigate(['/']);
            } else {
                this.#router.navigate(['/login']);
            }
        });
    }
}
