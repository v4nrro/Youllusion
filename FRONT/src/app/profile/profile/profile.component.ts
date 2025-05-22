import { Component, computed, effect, inject, input, model, signal } from '@angular/core';
import { Profile } from '../interfaces/Profile';
import { AuthService } from '../../auth/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../service/profile.service';
import { VideoCardComponent } from '../../video/video-card/video-card.component';

@Component({
  selector: 'profile',
  imports: [VideoCardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent {
    profile = model.required<Profile>();
    subscribed = signal<boolean>(false);
    subscribers = signal<number | null>(null);

    #authService = inject(AuthService);
    #profileService = inject(ProfileService);
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
                    email: resp.user.email,
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
                this.subscribers.set(this.profile().subscribers.length);
            }
        })
    }
    
    toggleSubscribe() {
        this.#profileService.addOrRemoveSubscription(this.profile()._id)
        .subscribe((resp) => {

            if(this.subscribed()) {
                this.subscribers.set(this.subscribers()! - 1);
            }
            else {
                this.subscribers.set(this.subscribers()! + 1);
            }

            this.subscribed.set(resp.subscribed);
        });
    }
}