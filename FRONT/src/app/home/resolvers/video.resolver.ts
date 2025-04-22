import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, EMPTY } from 'rxjs';
import { HomeService } from '../services/home.service';
import { Post } from '../interfaces/Post';

export const videoResolver: ResolveFn<Post> = (route, state) => {
    const homeService = inject(HomeService);
    const router = inject(Router);
    
    return homeService.getPost(route.paramMap.get('id')!).pipe(
      catchError(() => {
            router.navigate(['/home']);
            return EMPTY;
        })
    );
}