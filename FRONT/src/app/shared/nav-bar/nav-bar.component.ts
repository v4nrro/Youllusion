import { Component } from '@angular/core';

@Component({
  selector: 'nav-bar',
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
    isMenuCollapsed = false;
  
    navItems = [
      { icon: 'bi bi-house-door-fill text-white', label: 'Home' },
      { icon: 'bi bi-compass text-white', label: 'Explore' },
      { icon: 'bi bi-collection-play text-white', label: 'Subscriptions' },
      { icon: 'bi bi-archive text-white', label: 'Library' },
      { icon: 'bi bi-clock-history text-white', label: 'History' },
      { icon: 'bi bi-play-btn text-white', label: 'Your videos' },
      { icon: 'bi bi-clock text-white', label: 'Watch later' },
      { icon: 'bi bi-hand-thumbs-up text-white', label: 'Liked videos' }
    ];
  
    toggleSidebar() {
      this.isMenuCollapsed = !this.isMenuCollapsed;
    }
    
    search(term: string) {
      console.log('Searching for:', term);
      // Implement your search logic here
    }
}
