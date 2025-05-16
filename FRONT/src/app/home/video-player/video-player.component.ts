import { Component, effect, inject, input, model, signal } from '@angular/core';
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
    post = model.required<Post>();
    postLikes = signal<number>(0);
    postDislikes = signal<number>(0);
    postLiked = signal<boolean>(false);
    postDisliked = signal<boolean>(false);

    #homeService = inject(HomeService);
    commentText = '';
    comments = signal<SingleComment[]>([]);

    constructor(){
        effect(() => {
            window.scrollTo(0, 0);
            this.loadComments();

            this.postLikes.set(this.post().likes.length);
            this.postDislikes.set(this.post().dislikes.length);
            this.postLiked.set(this.post().liked);
            this.postDisliked.set(this.post().disliked);
        })
    }

    likePost(postId: string) {
        this.#homeService.likePost(postId)
        .subscribe(() => {
            if(!this.postLiked()) {

                if(this.postDisliked()) {
                    this.postDisliked.set(false);
                    this.postDislikes.set(this.postDislikes() - 1);
                }
                
                this.postLiked.set(true);
                this.postLikes.set(this.postLikes() + 1);
            }
            else {
                this.postLiked.set(false);
                this.postLikes.set(this.postLikes() - 1);
            }
        });
    } 

    dislikePost(postId: string){
        this.#homeService.dislikePost(postId)
        .subscribe(() => {
            if(!this.postDisliked()) {
                this.postDisliked.set(true);

                if(this.postLiked()) {
                    this.postLiked.set(false);
                    this.postLikes.set(this.postLikes() - 1);
                }

                this.postDislikes.set(this.postDislikes() + 1);
            }
            else {
                this.postDisliked.set(false);
                this.postDislikes.set(this.postDislikes() - 1);
            }
        });
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
