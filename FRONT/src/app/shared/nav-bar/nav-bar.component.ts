import { Component, computed, inject, model, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { User } from '../../auth/interfaces/User';

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
    
    logged = computed(() => {
        return this.#authService.getLogged()
    });

    
    constructor() {
        this.#authService.getLoggedUser().subscribe((resp) => {
            this.user.set(resp.user);
        });
    }

    navItems = [
      { route: '/home', icon: 'bi bi-house-door-fill text-white', label: 'Home' },
      { route: '/subscriptions', icon: 'bi bi-collection-play text-white', label: 'Subscriptions' },
      { route: '/settings/videos', icon: 'bi bi-play-btn text-white', label: 'Your videos' },
      { route: '/liked-videos', icon: 'bi bi-hand-thumbs-up text-white', label: 'Liked videos' }
    ];

    toggleSidebar() {
        this.isMenuCollapsed.update(isMenuCollapsed => !isMenuCollapsed);
    }
    
    search(term: string) {
        console.log('Searching for:', term);
    }

    logout() {
        this.#authService.logout();
        this.#router.navigate(['/auth/login']);
    }
}
