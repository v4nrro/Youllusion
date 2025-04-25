import { Component, effect, input } from '@angular/core';
import { Post } from '../interfaces/Post';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'video-player',
  imports: [RouterLink],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css'
})
export class VideoPlayerComponent {
    post = input.required<Post>();
     
    constructor(){
        effect(() => {

        if(this.post()) console.log(this.post());
        })
        
    }
}
