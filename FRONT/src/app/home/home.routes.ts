import { Routes } from '@angular/router';

export const homeRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home-page/home-page.component').then(m => m.HomePageComponent),
        title: 'Home Page',
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
