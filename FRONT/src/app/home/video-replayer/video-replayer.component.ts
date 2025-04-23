import { Component, input } from '@angular/core';
import { Post } from '../interfaces/Post';

@Component({
  selector: 'video-replayer',
  imports: [],
  templateUrl: './video-replayer.component.html',
  styleUrl: './video-replayer.component.css'
})
export class VideoReplayerComponent {
    post = input.required<Post>();
     
}
