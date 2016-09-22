import { Component, OnInit, OnDestroy, EventEmitter, Input } from '@angular/core';
import { TaskService, Project, Task } from '../shared';
import { Subscription } from 'rxjs/Subscription';

let taskActive = new EventEmitter<number>();

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  @Input() project: Project;
  task_name: string;
  old_task_name: string;
  deadline: Date;

  taskActive$: Subscription;

  constructor(private _taskService: TaskService) {
  }

  ngOnInit() {
    this.taskActive$ = taskActive.subscribe((task_id)=>{
      this.project.tasks.forEach(task=> {
        if (task.active && task.id != task_id) task.active = false;
      });
    })
  }

  ngOnDestroy() {
    this.taskActive$.unsubscribe();
  }

  add() {
    if (this.task_name && this.task_name.trim() !== "") {
      this._taskService.create(this.task_name, this.project).subscribe(
        resp => {
          this.project.tasks.push(new Task(resp));
          this.task_name = '';
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  edit(task: Task) {
    this.old_task_name = task.name;
    task.editing = true;
  }

  cancel(task: Task) {
    if (task.id) task.name = this.old_task_name;
    task.editing = false;
  }

  save(task: Task) {
    if (task.name) {
      this._taskService.update(task).subscribe(
        resp => {
          task.name = resp.name;
          task.editing = false;
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  delete(task: Task) {
    this._taskService.delete(task).subscribe(
      resp => {
        var index = this.project.tasks.indexOf(task);
        this.project.tasks.splice(index, 1);
      },
      error => {
        console.log(error);
      }
    )
  }

  onNameClick(task: Task) {
    task.active = !task.active;
    taskActive.emit(task.id); // deactivate active tasks exept task.id
  }

  setDeadline(task: Task, date: Date) {
    this._taskService.deadline(task, date).subscribe(
      resp => task.deadline = resp.deadline,
      error => {
        console.log(error);
      }
    )
  }

  setDone(task: Task, checked: boolean) {
    console.log(checked);
    this._taskService.done(task, checked).subscribe(
      resp => task.done = resp.done,
      error => {
        console.log(error);
      }
    )
  }


}
