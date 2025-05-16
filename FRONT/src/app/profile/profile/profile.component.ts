import { Component, computed, effect, inject, input, model, signal } from '@angular/core';
import { Profile } from '../interfaces/Profile';
import { AuthService } from '../../auth/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent {
    profile = model.required<Profile>();
    subscribed = signal<boolean>(false);
    #authService = inject(AuthService);
    #router = inject(Router);
    #route = inject(ActivatedRoute);

    logged = computed(() => {
        return this.#authService.getLogged()
    });
    
    constructor() {
        const userId = this.#route.snapshot.paramMap.get('id');

        this.#authService.getLoggedUser()
        .subscribe((resp) => {
            if(this.#router.url === '/profile/me' || resp.user._id === userId) {
                this.profile.set({_id: resp.user._id,
                    username: resp.user.username,
                    avatar: resp.user.avatar,
                    me: resp.user.me,
                    posts: resp.user.posts,
                    subscriptions: resp.user.subscriptions,
                    subscribers: resp.user.subscribers,
                    subscribed: resp.user.subscribed,
                });
            }
        });

        effect(() => {
            if(this.profile()) {
                this.subscribed.set(this.profile().subscribed);
            }
        })
    }
}