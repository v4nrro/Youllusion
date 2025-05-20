import {
    Component,
    DestroyRef,
    effect,
    inject,
    model,
    signal,
} from '@angular/core';
import { ValidationClassesDirective } from '../../shared/directives/validation-classes.directive';
import {
    FormsModule,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { HomeService } from '../../home/services/home.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Post } from '../../home/interfaces/Post';

@Component({
    selector: 'video-edit',
    imports: [ReactiveFormsModule, FormsModule, ValidationClassesDirective],
    templateUrl: './video-edit.component.html',
    styleUrl: './video-edit.component.css',
})
export class VideoEditComponent {
    video = model.required<Post>();
    selectedFile: File | null = null;
    imagePreview = signal<string | ArrayBuffer | null>(null);

    #homeService = inject(HomeService);
    #fb = inject(NonNullableFormBuilder);
    #destroyRef = inject(DestroyRef);
    #router = inject(Router);

    videoForm = this.#fb.group({
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        price: [0, [Validators.min(0)]],
        miniature: [null, [Validators.required]],
    });

    constructor() {
        effect(() => {
            if (this.video()) {
                const videoData = this.video();
                this.videoForm.patchValue({
                    title: videoData.title,
                    description: videoData.description,
                    price: videoData.price,
                });

                this.imagePreview.set(videoData.miniature);
            }
        });
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;

            const input = event.target as HTMLInputElement;
            if (input.files && input.files[0]) {
                const file = input.files[0];
                const reader = new FileReader();

                reader.onload = () => {
                    this.imagePreview.set(reader.result);
                };

                reader.readAsDataURL(file);
            }
        } else {
            this.selectedFile = null;
            this.imagePreview.set(null);
        }
    }

    deletePost() {
        this.#homeService
            .deletePost(this.video()._id)
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe(() => {
                this.#router.navigate(['/profile/videos']);
            });
    }

    edit() {
        const formData = new FormData();

        formData.append('title', this.videoForm.getRawValue().title);
        formData.append(
            'description',
            this.videoForm.getRawValue().description
        );
        formData.append('price', this.videoForm.getRawValue().price.toString());

        if (this.selectedFile) {
            formData.append('miniature', this.selectedFile);
        }

        this.#homeService
            .putPost(formData, this.video()._id)
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe(() => {
                this.#router.navigate(['/profile/videos']);
            });
    }
}
