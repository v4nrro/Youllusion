import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { Profile } from '../interfaces/Profile';
import { AuthService } from '../../auth/service/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { HomeService } from '../../home/services/home.service';
import { Post } from '../../home/interfaces/Post';
import { DeleteModalComponent } from '../../shared/components/delete-modal/delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'my-videos',
    imports: [ DatePipe ],
    templateUrl: './my-videos.component.html',
    styleUrl: './my-videos.component.css',
})
export class MyVideosComponent {
    loggedUser = signal<Profile | null>(null);
    posts = signal<Post[]>([]);

    #router = inject(Router);
    #authService = inject(AuthService);
    #destroyRef = inject(DestroyRef);
    #homeService = inject(HomeService);
    #ngbModal = inject(NgbModal);

    constructor() {
        effect(() => {
            this.loadLoggedUser();
        });
    }

    openModal(id: string) {
        const modalRef = this.#ngbModal.open(DeleteModalComponent);

        modalRef.componentInstance.title = 'Deleting video';
        modalRef.componentInstance.body = 'Are you sure you want to delete this video?';

        modalRef.result
        .then((result) => {
            if(result) {
                this.deleteVideo(id)
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deleteVideo(id: string) {
        this.#homeService
            .deletePost(id)
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe(() => {
                this.posts.update((currentPosts) =>
                    currentPosts.filter((post) => post._id !== id)
                );
            });
    }

    loadLoggedUser() {
        this.#authService
            .getLoggedUser()
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe((resp) => {
                this.loggedUser.set(resp.user);
                this.posts.set(resp.user.posts);
            });
    }

    goToEdit(id: string) {
        this.#router.navigate(['/video/edit', id], { queryParams: { collapse: true }});
    }
}
