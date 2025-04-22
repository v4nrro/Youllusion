import { Component, effect, inject, input } from '@angular/core';
import { Post } from '../interfaces/Post';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'video-detail',
  imports: [],
  templateUrl: './video-detail.component.html',
  styleUrl: './video-detail.component.css'
})
export class VideoDetailComponent {
    post = input.required<Post>();

}
