import { Routes } from '@angular/router';

export const profileRoutes: Routes = [
    {
        path: 'me',
        loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
        title: 'Profile Page',
    },
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
