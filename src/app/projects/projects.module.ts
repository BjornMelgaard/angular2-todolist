import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { ProjectsComponent } from './projects.component';
import { ProjectService } from './shared';
import { AutofocusDirective } from './ui';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [ProjectsComponent, AutofocusDirective],
  providers: [ProjectService]
})
export class ProjectsModule { }
