import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ValidationClassesDirective } from '../../shared/directives/validation-classes.directive';

@Component({
    selector: 'register',
    imports: [ReactiveFormsModule, ValidationClassesDirective],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
})
export class RegisterComponent {
    passwordType = signal('password');
    #fb = inject(NonNullableFormBuilder);
    #authService = inject(AuthService);
    #destroyRef = inject(DestroyRef);
    #router = inject(Router);
    errorMsg = signal('');
    selectedFile: File | null = null;
    imagePreview = signal<string | ArrayBuffer | null>(null);

    registerForm = this.#fb.group({
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        repeatPassword: ['', [Validators.required]],
        avatar: [null, [Validators.required]],
    });

    hideShowPassword() {
        this.passwordType.update((type) =>
            type === 'password' ? 'text' : 'password'
        );
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

    register() {
        const formData = new FormData();

        formData.append('username', this.registerForm.getRawValue().username);
        formData.append('email', this.registerForm.getRawValue().email);
        formData.append('password', this.registerForm.getRawValue().password);
        formData.append(
            'repeatPassword',
            this.registerForm.getRawValue().repeatPassword
        );

        if (this.selectedFile) {
            formData.append('avatar', this.selectedFile);
        }

        this.#authService
            .register(formData)
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe(() => {
                this.#router.navigate(['/auth/login'], { queryParams: {collapse: true }});
            });
    }
}
