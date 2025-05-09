import { Routes } from '@angular/router';
import { logoutActivateGuard } from '../shared/guards/logout-activate.guard';

export const authRoutes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
        canActivate: [logoutActivateGuard],
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
        canActivate: [logoutActivateGuard],
    },
    // {
    //     path: 'profile',
    //     loadChildren: () => import('./profile/profile.routes').then(m => m.profileRoutes),
    // },
    // { path: '', redirectTo: '/auth/login',  pathMatch: 'full' },
    // { path: '**', redirectTo: '/auth/login' },
];
