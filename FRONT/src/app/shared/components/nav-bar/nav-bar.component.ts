import { Component, effect, inject, model, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/service/auth.service';
import { User } from '../../../auth/interfaces/User';

@Component({
  selector: 'nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
    isMenuCollapsed = model(true);
    #authService = inject(AuthService);
    #router = inject(Router);
    user = signal<User | null>(null);
    logged = signal<Boolean>(false); 

    
    constructor() {
        effect(() => {
            this.logged.set(this.#authService.getLogged())

            if(this.logged()){
                this.#authService.getLoggedUser()
                .subscribe((resp) => {
                    this.user.set(resp.user);
                });
            }
        })
    }

    navItems = [
      { route: '/', icon: 'bi bi-house-door text-white', label: 'Home' },
      { route: '/profile/subscriptions', icon: 'bi bi-collection-play text-white', label: 'Subscriptions' },
      { route: '/profile/videos', icon: 'bi bi-play-btn text-white', label: 'Your videos' },
      { route: '/profile/liked', icon: 'bi bi-hand-thumbs-up text-white', label: 'Liked videos' }
    ];

    toggleSidebar() {
        this.isMenuCollapsed.update(isMenuCollapsed => !isMenuCollapsed);
    }
    
    search(term: string) {
        this.#router.navigate([`/`], { queryParams: { search: term } })
    }

    logout() {
        this.#authService.logout();
        this.#router.navigate(['/auth/login']);
    }
}
