import {HostListener, OpaqueToken, Inject, AfterViewInit, Component, Input, Output, EventEmitter, OnInit, OnDestroy, ElementRef} from '@angular/core';

export interface ConfirmConfig {
  onConfirm: Function;
  onCancel: Function;
  onAfterViewInit: Function;
  message: String;
}

export let CONFIRM_CONFIG = new OpaqueToken('confirm.config');


@Component({
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnDestroy, AfterViewInit {
  config: ConfirmConfig;

  constructor(private element: ElementRef, @Inject(CONFIRM_CONFIG) config:ConfirmConfig) {
    this.config = config;
  }

  //#TODO
  // @HostListener('blur', ['$event']) onBlur() {
  //   console.log("blur");
  //   this.config.onCancel();
  // }

  ngAfterViewInit() {
    this.config.onAfterViewInit();
  }

  ngOnDestroy() {
    console.log("ngOnDestroy");
  }
}
