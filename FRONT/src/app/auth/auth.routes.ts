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
];
