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
    imports: [
        ReactiveFormsModule,
        ValidationClassesDirective,
    ],
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

    registerForm = this.#fb.group({
        email: ['', [Validators.required, Validators.email]],
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        repeatPassword: ['', [Validators.required]],
        avatar: ['', [Validators.required]],
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
        }
    }

    register() {
        this.#authService
            .register({
                username: this.registerForm.getRawValue().username,
                email: this.registerForm.getRawValue().email,
                password: this.registerForm.getRawValue().password,
                repeatPassword: this.registerForm.getRawValue().repeatPassword,
                avatar: this.selectedFile,
            })
            .pipe(takeUntilDestroyed(this.#destroyRef))
            .subscribe(() => {
                this.#router.navigate(['/auth/login']);
            });
    }
}
