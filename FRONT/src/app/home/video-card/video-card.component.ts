import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Post } from '../interfaces/Post';

@Component({
  selector: 'video-card',
  imports: [RouterLink],
  templateUrl: './video-card.component.html',
  styleUrl: './video-card.component.css'
})
export class VideoCardComponent {
    post = input.required<Post>();
}
