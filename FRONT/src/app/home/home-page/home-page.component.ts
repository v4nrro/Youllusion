import { Component, effect, inject, signal } from '@angular/core';
import { VideoCardComponent } from "../video-card/video-card.component";
import { HomeService } from '../services/home.service';
import { Post } from '../interfaces/Post';

@Component({
  selector: 'home-page',
  imports: [VideoCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})

export class HomePageComponent {
    #homeService = inject(HomeService);

    posts = signal<Post[]>([]);

    constructor() {
        effect(() => {
            this.#homeService.getPosts().subscribe(
                (response) => this.posts.set(response)
            );
        });
    }
}
