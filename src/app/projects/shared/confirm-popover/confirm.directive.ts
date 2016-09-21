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
  ReflectiveInjector
} from '@angular/core';
import { ConfirmComponent } from "./confirm.component"

@Directive({
  selector: 'confirm',
})
export class ConfirmDirective {
  // @Optional() @Input() message: string;
  @Input() message: string;
  @Output() confirm: EventEmitter<any> = new EventEmitter();

  constructor(
    private vcRef: ViewContainerRef,
    private elm: ElementRef,
    private cfr: ComponentFactoryResolver,
    private renderer: Renderer
  ) { console.log(vcRef, elm)}

  private default_message = 'Are you shure?'
  private popover: ComponentRef<ConfirmComponent> = null;

  showPopover(): void {
    if (!this.popover) {
      const options: any = {
        onConfirm: ():void => {
          this.onConfirm();
        },
        message: this.message && this.default_message
      }
      const factory: ComponentFactory<ConfirmComponent> = this.cfr.resolveComponentFactory(ConfirmComponent);
      const binding = ReflectiveInjector.resolve([options]);
      const injector = ReflectiveInjector.fromResolvedProviders(binding, this.vcRef.parentInjector);

      this.popover = this.vcRef.createComponent(factory, null, injector)
    }
  }

  hidePopover(): void {

  }


  onConfirm() {
    console.log("onConfirm")
    this.confirm.emit();
  }

  onCancel() {
    if (this.popover) this.popover.destroy();
  }
}
