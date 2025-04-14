import { Component } from '@angular/core';
import { VideoCardComponent } from "../../video-card/video-card.component";

@Component({
  selector: 'nav-bar',
  imports: [VideoCardComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
    isMenuCollapsed = false;
  
    navItems = [
      { icon: 'bi bi-house-door-fill text-white', label: 'Home' },
      { icon: 'bi bi-collection-play text-white', label: 'Subscriptions' },
      { icon: 'bi bi-play-btn text-white', label: 'Your videos' },
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
