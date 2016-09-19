import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ProjectsComponent } from './projects.component';
import { ProjectService, ProjectHeaderEditedService } from './shared';
import { ProjectHeaderComponent, Autofocus } from './ui';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [ProjectsComponent, ProjectHeaderComponent],
  providers: [ProjectService, ProjectHeaderEditedService]
})
export class ProjectsModule { }
