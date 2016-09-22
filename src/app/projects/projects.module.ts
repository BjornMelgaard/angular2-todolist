import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DatepickerModule, DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { DndModule } from 'ng2-dnd';
import { ToastyModule } from 'ng2-toasty';

import { ProjectService, TaskService, CommentService,
  AutofocusDirective, AutosizeDirective, ConfirmModule, BytesPipe, HandleErrorService } from './shared';
import { ProjectsComponent } from './projects.component';
import { TaskListComponent } from './task-list/task-list.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { AuthModule } from '../auth';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    DatepickerModule,
    DropdownModule,
    ConfirmModule,
    DndModule.forRoot(),
    FileUploadModule,
    AuthModule,
    ToastyModule.forRoot()
   ],
  declarations: [
    ProjectsComponent,
    TaskListComponent,
    CommentListComponent,
    AutofocusDirective,
    AutosizeDirective,
    BytesPipe
  ],
  exports: [BrowserModule, FormsModule, DndModule, ToastyModule],
  providers: [ProjectService, TaskService, CommentService, HandleErrorService]
})
export class ProjectsModule { }
