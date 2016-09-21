import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Task, Comment, Attachment } from './models';
import { ApiService } from '../../auth';
import 'rxjs/add/operator/map';

@Injectable()
export class CommentService {
  constructor(private _api: ApiService) {
  }

  create(comment_text:string, owner: Task, attachments: Array<Attachment> = []) {
    const params = {comment: {text: comment_text, task_id: owner.id}, attachments: attachments.map(attachment => attachment.id)}
    console.log(params);

    return this._api
      .post('/comments', params)
      .map(r => new Comment(r));
  }


  delete(comment: Comment) {
    return this._api
      .delete('/comments/' + comment.id); }

}