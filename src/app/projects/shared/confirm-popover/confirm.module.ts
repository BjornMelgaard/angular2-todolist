import { NgModule } from '@angular/core';
import { ConfirmComponent } from './confirm.component';
import { ConfirmDirective } from './confirm.directive';
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [ CommonModule ],
  declarations:[ ConfirmDirective, ConfirmComponent ],
  exports: [ ConfirmDirective, ConfirmComponent ],
  entryComponents: [ ConfirmComponent ]
})
export class ConfirmModule { }
