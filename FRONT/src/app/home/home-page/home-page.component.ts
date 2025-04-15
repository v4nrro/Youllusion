import { Component } from '@angular/core';
import { VideoCardComponent } from "../video-card/video-card.component";

@Component({
  selector: 'home-page',
  imports: [VideoCardComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
}
