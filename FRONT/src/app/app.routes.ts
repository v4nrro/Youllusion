import { Routes } from '@angular/router';
import { checkLoggedGuard } from './shared/guards/check-logged.guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes),
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.routes').then(m => m.homeRoutes),
        canActivate: [checkLoggedGuard]
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.routes').then(m => m.profileRoutes),
        canActivate: [checkLoggedGuard]
    },
    { path: '', redirectTo: '/home',  pathMatch: 'full' },
    { path: '**', redirectTo: '/home' },
];
