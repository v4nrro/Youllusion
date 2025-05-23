import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
    FormsModule,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationClassesDirective } from '../../shared/directives/validation-classes.directive';
import { HomeService } from '../../home/services/home.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'video-upload',
    imports: [ReactiveFormsModule, FormsModule, ValidationClassesDirective, ImageCropperComponent],
    templateUrl: './video-upload.component.html',
    styleUrl: './video-upload.component.css',
})
export class VideoUploadComponent {
    selectedMiniature: File | null = null;
    selectedVideo: File | null = null;
    imagePreview = signal<string | ArrayBuffer | null>(null);
    imageChangedEvent: Event | null = null;
    croppedImage: SafeUrl  = '';
    

    #homeService = inject(HomeService);
    #fb = inject(NonNullableFormBuilder);
    #destroyRef = inject(DestroyRef);
    #router = inject(Router);
    #sanitizer = inject(DomSanitizer);

    videoForm = this.#fb.group({
        video: [null, [Validators.required]],
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        price: ['', [Validators.required, Validators.min(0)]],
        miniature: [null, [Validators.required]],
    });

    fileChangeEvent(event: Event): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = this.#sanitizer.bypassSecurityTrustUrl(event.objectUrl as string);
      // event.blob can be used to upload the cropped image
    }
    imageLoaded(image: LoadedImage) {
        // show cropper
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }

    onFileSelected(event: any, type: 'video' | 'miniature') {
        const file = event.target.files[0];
        if (file) {
            if (type === 'video') {
                this.selectedVideo = file;
            } 
            else {
                this.selectedMiniature = file;
                const reader = new FileReader();
                reader.onload = () => {
                    this.imagePreview.set(reader.result);
                };
                reader.readAsDataURL(file);
            }
        } 
        else {
            if (type === 'video') {
                this.selectedVideo = null;
            } 
            else {
                this.selectedMiniature = null;
                this.imagePreview.set(null);
            }
        }
    }

    upload() {
        const formData = new FormData();

        formData.append('title', this.videoForm.getRawValue().title);
        formData.append(
            'description',
            this.videoForm.getRawValue().description
        );
        formData.append('price', this.videoForm.getRawValue().price);

        if (this.selectedVideo && this.selectedMiniature) {
            formData.append('post', this.selectedVideo);
            formData.append('miniature', this.selectedMiniature);
        }

        this.#homeService
            .postPost(formData)
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe(() => {
                this.#router.navigate(['/profile/videos']);
            });
    }
}
