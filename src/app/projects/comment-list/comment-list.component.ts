import { Component, Input } from '@angular/core';
import { CommentService, Task, Comment, Attachment, HandleErrorService } from '../shared';
import { FileUploader, Headers } from 'ng2-file-upload';
import { AuthConfig, ApiService } from '../../auth';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent {
  @Input() task: Task;
  comment_text: string;
  uploader:FileUploader;

  private attachments: Array<Attachment> = [];
  // #TODO centralize
  upload_url = environment.server_root + '/api/attachments/';
  download_url = environment.server_root;


  constructor(private _commentService: CommentService, private _api: ApiService, private _error: HandleErrorService, config: AuthConfig) {
    const headers: Array<Headers> = [
      { name: config.emailName, value: localStorage.getItem(config.emailName) },
      { name: config.tokenName, value: localStorage.getItem(config.tokenName) }
    ]

    this.uploader = new FileUploader({
      url: this.upload_url,
      headers: headers
    });
    this.uploader.onSuccessItem = (item, response:string, status:number, headers) => {
      this.attachments.push(new Attachment(JSON.parse(response)));
    }
    this.uploader.onErrorItem = (item, response:string, status:number, headers) => {
      let title = `Error on uploading ${item.name}`
      this._error.handle(title, title);
    }
  }

  add_comment() {
    this._error.handle(null, "Error on adding comment", "something goes wrong");


    if (!this.comment_text || this.comment_text.trim() == "") return;
    this._commentService.create(this.comment_text, this.task, this.attachments).subscribe(
      resp => {
        this.task.comments.push(new Comment(resp));
        this.uploader.clearQueue();
        this.comment_text = '';
        this.attachments = [];
      },
      this._error.handle
    )
  }

  delete(comment: Comment) {
    this._commentService.delete(comment).subscribe(
      resp => {
        var index = this.task.comments.indexOf(comment);
        this.task.comments.splice(index, 1);
      },
      this._error.handle
    )
  }

  upload() {
    setTimeout(() => this.uploader.uploadAll(), 0);
  }

  download(url) {
    this._api.get(url);
  }

}
