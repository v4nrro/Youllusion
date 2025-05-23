import { Component, effect, inject, signal } from '@angular/core';
import { HomeService } from '../../home/services/home.service';
import { User } from '../../auth/interfaces/User';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'subscriptions',
  imports: [RouterLink],
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
