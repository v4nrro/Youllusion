import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./home/home.routes').then(m => m.homeRoutes),
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes),
    },
    { path: '', redirectTo: '/home',  pathMatch: 'full' },
    { path: '**', redirectTo: '/home' },
];
