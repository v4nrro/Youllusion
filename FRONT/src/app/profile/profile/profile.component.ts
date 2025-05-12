import { Component, input } from '@angular/core';
import { Profile } from '../interfaces/Profile';

@Component({
  selector: 'profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent {
    profile = input.required<Profile>();
}