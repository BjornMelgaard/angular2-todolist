import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterOutletMap } from '@angular/router';
import { ModuleWithProviders }   from '@angular/core';
import { RouterModule }  from '@angular/router';

import { AppComponent } from './app.component';
import { AuthModule } from './auth';
import { AuthModalModule } from './auth-modal';
import { ProjectsComponent } from './projects/projects.component';
import { ROUTES }  from './app.routing';
import { ProjectsModule } from './projects';

import { environment } from '../environments/environment';

@NgModule({
  imports: [
    HttpModule,
    AuthModule.forRoot({
      apiUrl:      environment.server_root + '/api',
      signUpPath:  '/users/register',
      signInPath:  '/users/login',
      signOutPath: '/users/logout',
      facebookPath: '/users/auth/facebook'
    }),
    RouterModule.forRoot(ROUTES),
    AuthModalModule,
    ProjectsModule
  ],
  declarations: [ AppComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
