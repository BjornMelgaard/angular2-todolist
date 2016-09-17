import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService, AuthService } from '../auth';
import { ModalDirective } from 'ng2-bootstrap/components/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements AfterViewInit {
  @ViewChild('authModal') public authModal:ModalDirective;
  error: string;
  credentials = { email: '', password: '' };

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private router: Router
  ) {
  }

  ngAfterViewInit() {
    this.authModal.show();
  }

  private handleError(error) {
    console.log(error);
    let capitalize = function(srt: string): string {
      return srt.charAt(0).toUpperCase() + srt.slice(1);
    }
    try
    {
      let body = error.json();
      if (body.errors) {
        let errors = body.errors;
        let first_key = Object.keys(errors)[0];
        let first_value = errors[first_key];
        let full_message = `${capitalize(first_key)} ${first_value}`;
        this.error = full_message;
      }
    }
    catch (Error)
    {
      this.error = error.statusText;
    }
  }

  signUp(): void {
    this.auth.signUp(
      this.credentials.email,
      this.credentials.password,
      this.credentials.password
    ).subscribe(
      resp => {
        this.authModal.hide();
        this.router.navigate(['']);
      },
      error => this.handleError(error)
    );
  }

  signIn(): void {
    this.auth.signIn(
      this.credentials.email,
      this.credentials.password
    ).subscribe(
      resp => {
        this.authModal.hide();
        this.router.navigate(['']);
      },
      error => this.handleError(error)
    );
  }

  facebook(): void {
    // # TODO
  }

  // signOut(): void {
  //   this.auth.signOut().subscribe(
  //     resp => {
  //       console.log(resp);
  //     },
  //     error => this.handleError(error)
  //   );
  // }


}
