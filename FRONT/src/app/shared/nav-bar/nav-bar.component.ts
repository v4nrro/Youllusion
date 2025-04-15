import { Component, model } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
    isMenuCollapsed = model(true);

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
      // Implement your search logic here
    }

    clicking() {
        console.log("clicking");
    }
}
