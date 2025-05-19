import { Component, input } from '@angular/core';
import { Post } from '../interfaces/Post';
import { VideoPlayerComponent } from "../../video/video-player/video-player.component";

@Component({
  selector: 'video-detail',
  imports: [VideoPlayerComponent],
  templateUrl: './watch-page.component.html',
  styleUrl: './watch-page.component.css'
})
export class WatchPageComponent {
    post = input.required<Post>();

}