import { Injectable } from '@angular/core';
import { ToastyService, ToastOptions } from 'ng2-toasty';

@Injectable()
export class HandleErrorService {
  constructor(private _toast: ToastyService) {
  }

  handle(error: any, title: string = "Error", msg: string = "Something goes wrong") {
    console.log(error);
    let toastyOptions = <ToastOptions>{
      title: title,
      msg: msg
    };
    this._toast.error(toastyOptions);
  }

}
