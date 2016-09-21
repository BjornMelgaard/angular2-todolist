import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Project, Task, Comment } from './models';
import { ApiService } from '../../auth';

@Injectable()
export class TaskService {
  constructor(private _api: ApiService) {
  }

  create(task_name:string, owner: Project) {
    return this._api
      .post('/tasks', {name: task_name, project_id: owner.id})
      .map(r => new Task(r));
  }

  update(task: Task) {
    return this._api
      .put('/tasks/' + task.id, task)
      .map(r => new Task(r));
  }

  delete(task: Task) {
    return this._api.delete('/tasks/' + task.id); }

  done(task: Task, done: boolean) {
    return this._api
      .put(`/tasks/${task.id}/done`, {done: done})
      .map(r => new Task(r));
  }

  sort(task: Task, position: number) {
    return this._api
      .put(`/tasks/${task.id}/sort`, {position: position})
      .map(r => new Task(r));
  }

  deadline(task: Task, date: Date) {
    return this._api
      .put(`/tasks/${task.id}/deadline`, {deadline: date})
      .map(r => new Task(r));
  }
}