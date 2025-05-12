import { Component, effect, input } from '@angular/core';
import { Post } from '../interfaces/Post';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HomePageComponent } from "../home-page/home-page.component";

@Component({
  selector: 'video-player',
  imports: [RouterLink, DatePipe, HomePageComponent],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css'
})
export class VideoPlayerComponent {
    post = input.required<Post>();
    
    constructor(){
    }

    likePost(postId: string) {

    } 

    dislikePost(postId: string){

    }

    likeComment(commentId: string) {

    } 

    dislikeComment(commentId: string){

    }

    commentPost(videoId: string) {

    }
}
