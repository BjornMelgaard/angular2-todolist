import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterOutletMap } from '@angular/router';
import { ModuleWithProviders }   from '@angular/core';
import { RouterModule }  from '@angular/router';

import { DatepickerModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { AuthModule } from './auth';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { ProjectsComponent } from './projects/projects.component';
import { ROUTES }  from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,

    AuthModule.forRoot({
      apiUrl:      'http://localhost:3000',
      signUpPath:  '/auth/register',
      signInPath:  '/auth/login',
      signOutPath: '/auth/logout'
    }),
    RouterModule.forRoot(ROUTES),

    // DatepickerModule,
    ModalModule
  ],
  declarations: [
    AppComponent,
    AuthModalComponent,
    ProjectsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
