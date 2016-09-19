import {Injectable}      from '@angular/core'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

// if one of headers is editend, emit true
@Injectable()
export class ProjectHeaderEditedService {
  private _editedSource = new BehaviorSubject<boolean>(false);

  edited$ = this._editedSource.asObservable();

  changeEdited(val: boolean) {
    this._editedSource.next(val);
  }
}