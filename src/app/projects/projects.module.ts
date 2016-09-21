import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DatepickerModule, DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

import { ProjectService, TaskService, CommentService,
  AutofocusDirective, AutosizeDirective, ConfirmModule, BytesPipe } from './shared';
import { ProjectsComponent } from './projects.component';
import { TaskListComponent } from './task-list/task-list.component';
import { CommentListComponent } from './comment-list/comment-list.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    FileUploadModule,
    DatepickerModule,
    DropdownModule,
    ConfirmModule,
   ],
  declarations: [
    ProjectsComponent,
    TaskListComponent,
    CommentListComponent,
    AutofocusDirective,
    AutosizeDirective,
    BytesPipe
  ],
  providers: [ProjectService, TaskService, CommentService]
})
export class ProjectsModule { }
