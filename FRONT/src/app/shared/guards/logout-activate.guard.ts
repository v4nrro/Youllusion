import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { map } from 'rxjs';

export const logoutActivateGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    return authService.isLogged()
    .pipe(map((result) => {
        if(result){
            return router.createUrlTree(['/home']);
        }
        return true;
    }))
};
