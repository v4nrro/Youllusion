import { Routes } from '@angular/router';
import { videoResolver } from './resolvers/video.resolver';

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
];
