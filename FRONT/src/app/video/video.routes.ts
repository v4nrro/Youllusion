import { Routes } from '@angular/router';
import { loginActivateGuard } from '../shared/guards/login-activate.guard';
import { videoResolver } from '../home/resolvers/video.resolver';

export const videoRoutes: Routes = [
    {
        path: 'upload',
        loadComponent: () => import('./video-upload/video-upload.component').then(m => m.VideoUploadComponent),
        title: 'Video Upload Page',
        canActivate: [loginActivateGuard],
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./video-edit/video-edit.component').then(m => m.VideoEditComponent),
        title: 'Video Edit Page',
        canActivate: [loginActivateGuard],
        resolve: {
            video: videoResolver
        }
    },
];
