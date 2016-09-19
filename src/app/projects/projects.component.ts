import { Component, OnInit, OnDestroy, EventEmitter} from '@angular/core';
import { ProjectService, Project, Task, Comments, ProjectHeaderEditedService } from './shared';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projects: Project[];
  editing = false;
  subscription: Subscription;

  constructor(private _projectService: ProjectService, private _editedService: ProjectHeaderEditedService) {}

  private remove(project: Project) {
    var index = this.projects.indexOf(project);
    this.projects.splice(index, 1);
  }

  ngOnInit() {
    this._projectService.fetchAll().subscribe(p => this.projects = p );
    this.subscription = this._editedService.edited$
      .subscribe(item => this.editing = item);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onUpdate(project: Project) {
    if (project.id) {
      this._projectService.update(project).subscribe();
    } else if (project.name) {
      this._projectService.create(project)
        .subscribe(p => {
          // var index = this.projects.indexOf(project);
          // this.projects[index] = p;
          project.id = p.id;
        });
    }
  }

  onDelete(project: Project) {
    if (project.id) {
      this._projectService.delete(project)
        .subscribe(p => {
          this.remove(project);
        });
    } else {
      this.remove(project);
    }
  }

  onCreate() {
    this.projects.push(new Project());
  }
}
