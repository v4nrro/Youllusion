import { Component, effect, inject, input, signal } from '@angular/core';
import { Post, SingleComment } from '../interfaces/Post';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HomePageComponent } from "../home-page/home-page.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'video-player',
  imports: [RouterLink, DatePipe, HomePageComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css'
})
export class VideoPlayerComponent {
    post = input.required<Post>();
    #homeService = inject(HomeService);
    commentText = '';
    comments = signal<SingleComment[]>([]);

    constructor(){
        effect(() => {
            window.scrollTo(0, 0);
            this.loadComments();
        })
    }

    likePost(postId: string) {

    } 

    dislikePost(postId: string){

    }

    likeComment(commentId: string) {

    } 

    dislikeComment(commentId: string){

    }

    loadComments() {
        this.#homeService.getComments(this.post()._id)
        .subscribe((resp) => {
            this.comments.set(resp);
        });
    }

    commentPost() {
        this.#homeService.postComment(this.post()._id, this.commentText)
        .subscribe((resp) => {
            this.loadComments();
        });

        this.commentText = '';
    }
}
