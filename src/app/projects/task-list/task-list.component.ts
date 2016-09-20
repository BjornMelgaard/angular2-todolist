import { Component, OnInit, OnDestroy, EventEmitter, Input } from '@angular/core';
import { TaskService, Project, Task } from '../shared';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';

let someTaskActive: EventEmitter<any> = new EventEmitter();

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  @Input() project: Project;
  task_name: string;
  old_task_name: string;
  subscription: Subscription;
  dt: Date;

  constructor(private _taskService: TaskService) {
    console.log(moment())
  }

  ngOnInit() {
    this.subscription = someTaskActive.subscribe(()=>{
      this.project.tasks.forEach(task=> {
        if (task.active) task.active = false
      });
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  add() {
    if (this.task_name && this.task_name.trim() !== "") {
      this._taskService.create(this.task_name, this.project.id).subscribe(
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
    someTaskActive.emit(); // deactivate other active tasks
  }

  setDeadline(task: Task, date) {
    this._taskService.delete(task).subscribe(
      resp => {
        task.deadline = resp.deadline;
      },
      error => {
        console.log(error);
      }
    )
  }

  setDone(task: Task) {
    this._taskService.done(task).subscribe(
      _ => {},
      error => {
        console.log(error);
      }
    )
  }


}
