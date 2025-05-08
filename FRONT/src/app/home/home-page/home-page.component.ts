import { Component, effect, inject, signal } from '@angular/core';
import { VideoCardComponent } from "../video-card/video-card.component";
import { HomeService } from '../services/home.service';
import { Post } from '../interfaces/Post';
import { AuthService } from '../../auth/service/auth.service';

@Component({
  selector: 'home-page',
  imports: [VideoCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})

export class HomePageComponent {
    #homeService = inject(HomeService);
    #authService = inject(AuthService);


    posts = signal<Post[]>([]);

    constructor() {
        effect(() => {
            this.#homeService.getPosts().subscribe(
                (response) => this.posts.set(response)
            );

            console.log(this.#authService.getLogged());
        });
    }
}
