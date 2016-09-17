import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

import { ProjectsComponent }  from './projects/projects.component';
import { AuthModalComponent }  from './auth-modal/auth-modal.component';
import { AuthGuard }  from './auth';

export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/projects',
    pathMatch: 'full'
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    component: AuthModalComponent
  },
  {
    path: '**', redirectTo: ''
  }
];
