import { Routes } from '@angular/router';
import { loginActivateGuard } from '../shared/guards/login-activate.guard';

export const videoRoutes: Routes = [
    {
        path: 'upload',
        loadComponent: () => import('./video-upload/video-upload.component').then(m => m.VideoUploadComponent),
        title: 'Profile Page',
        canActivate: [loginActivateGuard],
    },
    // { path: '', redirectTo: '/auth/login',  pathMatch: 'full' },
    // { path: '**', redirectTo: '/auth/login' },
];
