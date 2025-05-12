import { Routes } from '@angular/router';
import { loginActivateGuard } from '../shared/guards/login-activate.guard';
import { profileResolver } from './resolvers/profile.resolver';

export const profileRoutes: Routes = [
    {
        path: 'me',
        loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
        title: 'Profile Page',
        canActivate: [loginActivateGuard],
    },
    {
        path: ':id',
        loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
        title: 'Profile Page',
        resolve: {
            profile: profileResolver
        },
    }
    // {
    //     path: 'subscriptions',
    //     loadComponent: () => import('./home-page/home-page.component').then(m => m.HomePageComponent),
    //     title: 'Subscriptions Page',
    // },
    // {
    //     path: 'profile',
    //     loadComponent: () => import('./profile/profile.routes').then(m => m.profileRoutes),
    // },
    // { path: '', redirectTo: '/auth/login',  pathMatch: 'full' },
    // { path: '**', redirectTo: '/auth/login' },
];
