import {Component, Input, Output, EventEmitter, OnInit, OnDestroy, ElementRef} from '@angular/core';

@Component({
  templateUrl: './confirm.component.html',
})
export class ConfirmComponent implements OnInit, OnDestroy{
  constructor(private element: ElementRef, private onConfirm: Function, private message: String) {
    console.log("created", message, element);
  }

  ngOnInit() {
    console.log("ngOnInit");
  }

  ngOnDestroy() {
    console.log("ngOnDestroy");
  }
}
