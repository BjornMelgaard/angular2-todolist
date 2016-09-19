import { Component, OnInit, OnDestroy, EventEmitter} from '@angular/core';
import { ProjectService, Project, Task, Comments } from './shared';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[];
  editing = false;
  project_old_name: string;

  constructor(private _projectService: ProjectService) {}

  ngOnInit() {
    this._projectService.fetchAll().subscribe(p => this.projects = p );
  }

  create() {
    if (!this.editing) {
      let project = new Project();
      project.editing = true;

      this.editing = true;
      this.projects.push(project);
    }
  }

  cancel(project: Project) {
    if (project.id) {
      project.name = this.project_old_name;
    } else {
      this.projects.pop();
    }
  }

  save(project: Project) {
    if (project.name && project.name.trim() !== "") {
      if (project.id) {
        this._projectService.update(project).subscribe(
          resp => {
            project.editing = false;
            this.editing = false;
          },
          error => console.log(error) //#
        );
      } else {
        this._projectService.create(project).subscribe(
          resp => {
            project.id = resp.id;
            project.editing = false;
            this.editing = false;
          },
          error => console.log(error) //#
        )
      }
    } else if (!project.id) {
      this.projects.pop();
      this.editing = false;
    }
  }

  edit(project: Project) {
    this.project_old_name = project.name;
    this.editing = true;
    project.editing = true;
  }

  delete(project: Project) {
    if (project.id) {
      this._projectService.delete(project)
        .subscribe(p => {
          this.remove(project);
        });
    }
  }

  private remove(project: Project) {
    var index = this.projects.indexOf(project);
    this.projects.splice(index, 1);
  }
}
