import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Project, Task, Comments } from './models';
import { ApiService } from '../../auth';

@Injectable()
export class ProjectService {
  constructor(private _api: ApiService) {
  }

  fetchAll() {
    return this._api
      .get('/projects')
      .map(r => r.map((v: any) => new Project(v)));
  }

  fetch(id: string) {
    return this._api
      .get('/projects/' + id)
      .map(r => new Project(r));
  }

  create(project: Project) {
    return this._api
      .post('/projects', project)
      .map(r => new Project(r));
  }

  update(project: Project) {
    return this._api
      .put('/projects/' + project.id, project);
  }

  delete(project: Project) {
    return this._api
      .delete('/projects/' + project.id);
  }
}