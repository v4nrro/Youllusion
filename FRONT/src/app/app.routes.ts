import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes),
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.routes').then(m => m.homeRoutes),
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.routes').then(m => m.profileRoutes),
    },
    { path: '', redirectTo: '/home',  pathMatch: 'full' },
    { path: '**', redirectTo: '/home' },
];
