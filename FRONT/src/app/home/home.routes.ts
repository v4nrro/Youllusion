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
        loadComponent: () => import('./watch-page/watch-page.component').then(m => m.WatchPageComponent),
        title: 'Video Detail Page',
        resolve: {
            post: videoResolver
        }
    },
];
