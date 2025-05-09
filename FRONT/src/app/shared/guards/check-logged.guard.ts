import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { map } from 'rxjs';

export const checkLoggedGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
  
    return authService.isLogged()
    .pipe(map(() => {
        return true;
    }))
};
