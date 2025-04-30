import { Component, effect, input } from '@angular/core';
import { Post } from '../interfaces/Post';
import { VideoPlayerComponent } from "../video-player/video-player.component";

@Component({
  selector: 'video-detail',
  imports: [VideoPlayerComponent],
  templateUrl: './video-detail.component.html',
  styleUrl: './video-detail.component.css'
})
export class VideoDetailComponent {
    post = input.required<Post>();

}
