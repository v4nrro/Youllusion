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

        path: 'subscriptions',
        loadComponent: () => import('../profile/subscriptions/subscriptions.component').then(m => m.SubscriptionsComponent),
        title: 'Subscriptions Page',
        canActivate: [loginActivateGuard],
    },
    {
        path: 'liked',
        loadComponent: () => import('../profile/liked-videos/liked-videos.component').then(m => m.LikedVideosComponent),
        title: 'Liked Videos Page',
        canActivate: [loginActivateGuard],
    },
    {
        path: 'videos',
        loadComponent: () => import('../profile/my-videos/my-videos.component').then(m => m.MyVideosComponent),
        title: 'My Videos Page',
        canActivate: [loginActivateGuard],
    },
    {
        path: 'update/:id',
        loadComponent: () => import('./profile-update/profile-update.component').then(m => m.ProfileUpdateComponent),
        title: 'Profile Page',
        resolve: {
            profile: profileResolver
        },
    },
    {
        path: ':id',
        loadComponent: () => import('./profile/profile.component').then(m => m.ProfileComponent),
        title: 'Profile Page',
        resolve: {
            profile: profileResolver
        },
    },
];
