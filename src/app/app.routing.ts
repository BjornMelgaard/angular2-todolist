import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { ProjectsComponent }  from './projects';
import { AuthModalComponent }  from './auth-modal';
import { SingedInGuard, NotSingedInGuard }  from './auth';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/projects',
    pathMatch: 'full'
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [SingedInGuard]
  },
  {
    path: 'auth',
    component: AuthModalComponent,
    canActivate: [NotSingedInGuard]
  },
  {
    path: '**', redirectTo: ''
  }
];
