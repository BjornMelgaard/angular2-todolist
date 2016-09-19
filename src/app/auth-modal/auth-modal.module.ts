import { NgModule } from '@angular/core';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AuthModalComponent } from './auth-modal.component';

@NgModule({
  imports: [BrowserModule, FormsModule, ModalModule],
  declarations: [AuthModalComponent]
})
export class AuthModalModule { }
