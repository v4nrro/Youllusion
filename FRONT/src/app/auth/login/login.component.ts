import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ValidationClassesDirective } from '../../shared/directives/validation-classes.directive';

@Component({
  selector: 'login',
  imports: [ReactiveFormsModule, ValidationClassesDirective, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    passwordType = signal('password');
    #fb = inject(NonNullableFormBuilder);
    #authService = inject(AuthService);
    #destroyRef = inject(DestroyRef);
    #router = inject(Router);
    errorMsg = signal('');

    loginForm = this.#fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
    });

    hideShowPassword() {
        this.passwordType.update(type => type === 'password' ? 'text' : 'password');
    }

    login() {
        this.#authService.login({...this.loginForm.getRawValue()})
        .pipe(takeUntilDestroyed(this.#destroyRef))
        .subscribe({
            next: () => {
                this.#router.navigate(['/home']);
            },
            error: () => {
                this.errorMsg.set("Wrong email or password");
            }
        });
    }
}
