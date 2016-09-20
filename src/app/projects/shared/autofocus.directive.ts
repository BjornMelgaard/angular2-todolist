import {Directive, ElementRef, Renderer, OnInit} from '@angular/core';

@Directive({
  selector: '[autofocus]'
})
export class AutofocusDirective implements OnInit {
  constructor(private el: ElementRef) {
  }

  ngOnInit(){
    setTimeout(()=>this.el.nativeElement.focus(), 0);
  }
}