import { Component, effect, inject, signal } from '@angular/core';
import { HomeService } from '../../home/services/home.service';
import { Post } from '../../home/interfaces/Post';
import { VideoCardComponent } from '../../video/video-card/video-card.component';

@Component({
  selector: 'liked-videos',
  imports: [VideoCardComponent],
  templateUrl: './liked-videos.component.html',
  styleUrl: './liked-videos.component.css'
})
export class LikedVideosComponent {
    #homeService = inject(HomeService);

    posts = signal<Post[]>([]);

    constructor() {
        effect(() => {
            this.#homeService.getLikedPosts().subscribe(
                (response) => this.posts.set(response)
            );
        });
    }
}
