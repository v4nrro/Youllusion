import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { ProfileService } from '../service/profile.service';
import { Profile } from '../interfaces/Profile';

export const profileResolver: ResolveFn<Profile> = (route, state) => {
    const profileService = inject(ProfileService)
    const router = inject(Router);
    
    return profileService.getProfile(route.paramMap.get('id')!).pipe(
        catchError(() => {
            router.navigate(['/']);
            return EMPTY;
        })
    );
}