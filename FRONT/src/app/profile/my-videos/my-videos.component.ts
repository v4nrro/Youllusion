import {
    Component,
    DestroyRef,
    effect,
    inject,
    signal,
} from '@angular/core';
import { Profile } from '../interfaces/Profile';
import { AuthService } from '../../auth/service/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'my-videos',
    imports: [DatePipe, RouterLink],
    templateUrl: './my-videos.component.html',
    styleUrl: './my-videos.component.css',
})
export class MyVideosComponent {
    loggedUser = signal<Profile | null>(null);

    #router = inject(Router);
    #authService = inject(AuthService);
    #destroyRef = inject(DestroyRef);

    constructor() {
        effect(() => {
            this.#authService
                .getLoggedUser()
                .pipe(takeUntilDestroyed(this.#destroyRef))
                .subscribe((resp) => {
                    this.loggedUser.set(resp.user);
                });
        });
    }
    
    deleteVideo(id: string) {

    }

    navigate() {
        this.#router.navigate(['/video/edit'])    
    }
}
