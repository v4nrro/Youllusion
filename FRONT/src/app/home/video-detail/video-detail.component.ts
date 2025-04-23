import { Component, input } from '@angular/core';
import { Post } from '../interfaces/Post';
import { VideoReplayerComponent } from "../video-replayer/video-replayer.component";

@Component({
  selector: 'video-detail',
  imports: [VideoReplayerComponent],
  templateUrl: './video-detail.component.html',
  styleUrl: './video-detail.component.css'
})
export class VideoDetailComponent {
    post = input.required<Post>();

}
