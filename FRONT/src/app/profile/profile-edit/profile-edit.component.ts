import { Component, effect, inject, model, signal } from '@angular/core';
import { Profile } from '../interfaces/Profile';
import {
    FormsModule,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ValidationClassesDirective } from '../../shared/directives/validation-classes.directive';
import { ProfileService } from '../service/profile.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { DeleteModalComponent } from '../../shared/components/delete-modal/delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'profile-edit',
    imports: [ValidationClassesDirective, ReactiveFormsModule, FormsModule],
    templateUrl: './profile-edit.component.html',
    styleUrl: './profile-edit.component.css',
})
export class ProfileEditComponent {
    profile = model.required<Profile>();
    passwordType = signal('password');
    errorMsg = signal('');
    selectedFile: File | null = null;
    imagePreview = signal<string | ArrayBuffer | null>(null);

    #fb = inject(NonNullableFormBuilder);
    #router = inject(Router);
    #profileService = inject(ProfileService);
    #authService = inject(AuthService);
    #ngbModal = inject(NgbModal);

    passwordForm = this.#fb.group({
        previousPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required]],
        confirmNewPassword: ['', [Validators.required]],
    });

    credentialsForm = this.#fb.group({
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required]],
    });

    avatarForm = this.#fb.group({
        avatar: [null, [Validators.required]],
    });

    hideShowPassword() {
        this.passwordType.update((type) =>
            type === 'password' ? 'text' : 'password'
        );
    }

    constructor() {
        effect(() => {
            if (this.profile()) {
                this.credentialsForm.patchValue({
                    username: this.profile().username,
                    email: this.profile().email,
                });

                this.imagePreview.set(this.profile().avatar as string);
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

    editCredentials() {
        this.#profileService
            .editCredentials(this.credentialsForm.getRawValue())
            .subscribe((resp) => {
                // TODO: Reload?
                console.log("Credentials changed succesfully!");
            });
    }

    editPassword() {
        this.#profileService
            .editPassword(this.passwordForm.getRawValue())
            .subscribe(() => {
                // TODO: Show toast and reload?
                console.log('Password changed succesfully!');
            });
    }

    editAvatar() {
        if (this.selectedFile) {
            const formData = new FormData();
            formData.append('avatar', this.selectedFile);

            this.#profileService.editAvatar(formData)
            .subscribe((resp) => {
                // TODO: Reload?
                console.log("Avatar changed succesfully!");
            });
        }
    }

    openModal() {
        const modalRef = this.#ngbModal.open(DeleteModalComponent);

        modalRef.componentInstance.title = 'Deleting account';
        modalRef.componentInstance.body = 'Are you sure you want to delete this account?';

        modalRef.result
        .then((result) => {
            if(result) {
                this.deleteAccount();
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    deleteAccount() {
        this.#profileService.deleteMyAccount().subscribe(() => {
            this.#authService.logout()        
        })
    }
}
