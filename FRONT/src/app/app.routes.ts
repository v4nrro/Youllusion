import { Routes } from '@angular/router';
import { checkLoggedGuard } from './shared/guards/check-logged.guard';
import { loginActivateGuard } from './shared/guards/login-activate.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes),
    },
    {
        path: '',
        loadChildren: () => import('./home/home.routes').then(m => m.homeRoutes),
        canActivate: [checkLoggedGuard]
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.routes').then(m => m.profileRoutes),
        canActivate: [checkLoggedGuard]
    },
    {
        path: 'video',
        loadChildren: () => import('./video/video.routes').then(m => m.videoRoutes),
        canActivate: [loginActivateGuard]
    },
    { path: '', redirectTo: '/',  pathMatch: 'full' },
    { path: '**', redirectTo: '/' },
];
