import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Post } from '../../home/interfaces/Post';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'video-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.css'
})
export class VideoCardComponent {
    post = input.required<Post>();

    #router = inject(Router);

    goToWatch(id: string) {
        this.#router.navigate(['/watch', id])
    }

    goToAuthor(id: string) {
        this.#router.navigate(['/profile', id])
    }
}
