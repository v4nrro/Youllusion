import { Component, effect, inject, signal } from '@angular/core';
import { HomeService } from '../services/home.service';
import { Post } from '../interfaces/Post';
import { User } from '../../auth/interfaces/User';

@Component({
  selector: 'subscriptions',
  imports: [],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css'
})
export class SubscriptionsComponent {
    #homeService = inject(HomeService);

    users = signal<User[]>([]);

    constructor() {
        effect(() => {
            this.#homeService.getSubscriptions().subscribe(
                (response) => this.users.set(response)
            );
        });
    }
}
