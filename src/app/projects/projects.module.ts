import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DatepickerModule, DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';

import { ProjectsComponent } from './projects.component';
import { ProjectService, AutofocusDirective, Autosize, TaskService } from './shared';
import { TaskListComponent } from './task-list/task-list.component';

@NgModule({
  imports: [BrowserModule, FormsModule, DatepickerModule, DropdownModule],
  declarations: [
    ProjectsComponent,
    AutofocusDirective,
    TaskListComponent,
    Autosize

  ],
  providers: [ProjectService, TaskService]
})
export class ProjectsModule { }
