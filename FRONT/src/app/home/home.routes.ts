import { Routes } from '@angular/router';
import { videoResolver } from './resolvers/video.resolver';
import { loginActivateGuard } from '../shared/guards/login-activate.guard';

export const homeRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home-page/home-page.component').then(m => m.HomePageComponent),
        title: 'Home Page',
    },
    {
        path: 'watch/:id',
        loadComponent: () => import('./video-detail/video-detail.component').then(m => m.VideoDetailComponent),
        title: 'Video Detail Page',
        resolve: {
            post: videoResolver
        }
    },
    {
        path: 'subscriptions',
        loadComponent: () => import('./subscriptions/subscriptions.component').then(m => m.SubscriptionsComponent),
        title: 'Subscriptions Page',
        canActivate: [loginActivateGuard],
    },
    {
        path: 'liked',
        loadComponent: () => import('./liked-videos/liked-videos.component').then(m => m.LikedVideosComponent),
        title: 'Liked Videos Page',
        canActivate: [loginActivateGuard],
    }
];
