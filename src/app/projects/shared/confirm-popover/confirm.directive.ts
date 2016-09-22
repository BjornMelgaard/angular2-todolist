import {
  Directive,
  Input,
  Output,
  EventEmitter,
  ViewContainerRef,
  ElementRef,
  ComponentFactoryResolver,
  Renderer,
  ComponentFactory,
  ComponentRef,
  Injector,
  ReflectiveInjector,
  HostListener,
  Provider, OnDestroy
} from '@angular/core';
import { ConfirmComponent, CONFIRM_CONFIG, ConfirmConfig } from "./confirm.component"

interface Coords {
  top: number;
  left: number;
}

@Directive({
  selector: '[confirmable]',
})
export class ConfirmDirective {
  @Input() message: string;
  @Output() confirmed: EventEmitter<any> = new EventEmitter();
  orig_rect: any;

  constructor(
    private vcRef: ViewContainerRef,
    private elm: ElementRef,
    private cfr: ComponentFactoryResolver,
    private renderer: Renderer
  ) {
  }

  default_message = 'Are you shure?'
  popover: ComponentRef<ConfirmComponent> = null;

  @HostListener('click', ['$event.target']) onClick(btn) {
    if (!this.popover)
      this.showPopover()
    else
      this.hidePopover()
  }

  @HostListener('window:resize')
  onResize(): void {
    this.positionPopover();
  }



  // @HostListener('window:scroll')
  // onScroll(): void {
    // this.positionPopover();
  // }

  showPopover(): void {
    if (!this.popover) {
      const options: ConfirmConfig = {
        onConfirm: ():void => { this.onConfirm(); },
        onCancel: ():void => { this.onCancel(); },
        onAfterViewInit: () : void => { this.positionPopover(); },
        message: this.message || this.default_message
      }
      const factory: ComponentFactory<ConfirmComponent> = this.cfr.resolveComponentFactory(ConfirmComponent);
      const binding = ReflectiveInjector.resolve([{ provide: CONFIRM_CONFIG, useValue: options}]);
      const injector = ReflectiveInjector.fromResolvedProviders(binding, this.vcRef.parentInjector);

      this.popover = this.vcRef.createComponent(factory, null, injector);
      this.renderer.invokeElementMethod(document.body, 'appendChild', [this.popover.location.nativeElement]);
    }
  }

  positionPopover(): void {
    if (this.popover) {
      const popoverElement: HTMLElement = this.popover.location.nativeElement.children[0];
      const targetRect: any = this.elm.nativeElement.getBoundingClientRect();
      if (!this.orig_rect) this.orig_rect = popoverElement.getBoundingClientRect();

      const position: Coords = {
        top:  targetRect.top - this.orig_rect.top - this.orig_rect.height - 10,
        left: targetRect.left - this.orig_rect.left - this.orig_rect.width/2 + 10
      };

      this.renderer.setElementStyle(popoverElement, 'top', `${position.top}px`);
      this.renderer.setElementStyle(popoverElement, 'left', `${position.left}px`);
    }
  }

  hidePopover(): void {
    if (this.popover) {
      this.popover.destroy();
      this.popover = null;
      this.orig_rect = null;
    }
  }

  onConfirm() {
    this.hidePopover();
    this.confirmed.emit();
  }

  onCancel() {
    this.hidePopover();
  }

}
