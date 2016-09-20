import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Project, Task, Comments } from './models';
import { ApiService } from '../../auth';

@Injectable()
export class TaskService {
  constructor(private _api: ApiService) {
  }

  create(task_name:string, owner_id: number) {
    return this._api
      .post('/tasks', {name: task_name, project_id: owner_id})
      .map(r => new Task(r));
  }

  update(task: Task) {
    return this._api
      .put('/tasks/' + task.id, task)
      .map(r => new Task(r));
  }

  delete(task: Task) {
    return this._api
      .delete('/tasks/' + task.id)
      .map(r => new Task(r));
  }

  done(task: Task) {
    return this._api
      .put(`/tasks/${task.id}/done`, task)
      .map(r => new Task(r));
  }

  sort(task: Task) {
    return this._api
      .put(`/tasks/${task.id}/sort`, task)
      .map(r => new Task(r));
  }

  deadline(task: Task) {
    return this._api
      .put(`/tasks/${task.id}/deadline`, task)
      .map(r => new Task(r));
  }
}