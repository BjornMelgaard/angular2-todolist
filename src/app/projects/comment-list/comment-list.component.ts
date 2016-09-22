import { Component, Input } from '@angular/core';
import { CommentService, Task, Comment, Attachment } from '../shared';

const URL = 'http://localhost:3000/api/attachments/';

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent {
  @Input() task: Task;
  comment_text: string;
  attachments: Array<Attachment>;
  // uploader:FileUploader = new FileUploader({url: URL});

  constructor(private _commentService: CommentService) {
  }

  add() {
    this._commentService.create(this.comment_text, this.task, this.attachments).subscribe(
      resp => {
        this.task.comments.push(new Comment(resp));
        this.comment_text = '';
      },
      error => {
        console.log(error);
      }
    )
  }

  delete(comment: Comment) {
    this._commentService.delete(comment).subscribe(
      resp => {
        var index = this.task.comments.indexOf(comment);
        this.task.comments.splice(index, 1);
      },
      error => {
        console.log(error);
      }
    )
  }

  upload() {
  }

  removeAttachment() {

  }

}
