import { ElementRef, HostListener, Directive, OnInit} from '@angular/core';

@Directive({
    selector: 'textarea[autosize]'
})

export class AutosizeDirective implements OnInit {
 @HostListener('input',['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }
  constructor(public element: ElementRef){
  }
  ngOnInit(): void{
    setTimeout(()=>this.adjust(), 0);
  }
  adjust(): void{
    this.element.nativeElement.style.overflow = 'hidden';
    this.element.nativeElement.style.height = 'auto';
    this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + "px";
  }
}
