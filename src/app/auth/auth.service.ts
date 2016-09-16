import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api';
import { AuthConfig } from './config';
import { CanActivate, Router } from '@angular/router';
import 'rxjs/Rx';

@Injectable()
export class AuthService implements CanActivate{
  EMAIL_KEY: string = 'email';

  constructor(private api: ApiService, private router: Router, private config: AuthConfig) { }

  private setUser(response) {
    if(response.user && response.user.token && response.user.email){
      localStorage.setItem(this.EMAIL_KEY, response.user.email);
      let headers = {};
      headers[this.config.tokenName] = response.user.token;
      headers[this.config.emailName] = response.user.email;
      this.api.setHeaders(headers);
    } else {
      let error = new Error('Wrong user credentials');
      error['response'] = response;
      throw error;
    }
  }

  private removeUser() {
    localStorage.removeItem(this.EMAIL_KEY);
    this.api.resetHeaders();
  }

  isAuthorized(): boolean {
    return this.getUserEmail() !== null;
  }

  getUserEmail() {
    return localStorage.getItem(this.EMAIL_KEY);
  }

  canActivate(): boolean {
    const isAuth = this.isAuthorized();
    if (!isAuth) {
      this.router.navigate(['', 'auth']);
    }
    return isAuth;
  }

  signUp(creds): Observable<any> {
    return this.api.post(this.config.signUpPath, creds)
      .do((resp) => this.setUser(resp) );
  }

  signIn(creds): Observable<any> {
    return this.api.post(this.config.signInPath, creds)
      .do((resp) => this.setUser(resp));
  }

  signOut() {
    this.api.delete(this.config.signOutPath)
      .do(() => this.removeUser() )
      .do(() => this.router.navigate(['', 'auth']) );
  }


}
