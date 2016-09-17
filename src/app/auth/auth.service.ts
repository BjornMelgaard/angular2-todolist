import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api';
import { AuthConfig } from './config';
import { Response } from '@angular/http';

@Injectable()
export class AuthService {
  constructor(private api: ApiService, private config: AuthConfig) {
    let email = localStorage.getItem(this.config.emailName);
    let token = localStorage.getItem(this.config.tokenName);
    if (email && token) {
      this.setUser(email, token);
    }
  }

  private setUser(email: string, token: string) {
    localStorage.setItem(this.config.emailName, email);
    localStorage.setItem(this.config.tokenName, token);
    let headers = {};
    headers[this.config.emailName] = email;
    headers[this.config.tokenName] = token;
    this.api.setHeaders(headers);
  }

  private removeUser() {
    localStorage.removeItem(this.config.emailName);
    localStorage.removeItem(this.config.tokenName);
    this.api.resetHeaders();
  }

  private saveAuthorization(response) {
    if (response.user && response.user.email && response.user.token){
      this.setUser(response.user.email, response.user.token)
    } else {
      let error = new Error('Wrong user credentials');
      error['response'] = response;
      throw error;
    }
  }

  isAuthorized(): boolean {
    return this.getUserEmail() !== null;
  }

  getUserEmail() {
    return localStorage.getItem(this.config.emailName);
  }

  signUp(email, password, password_confirmation): Observable<any> {
    let creds = {user: {
      email: email,
      password: password,
      password_confirmation: password_confirmation}}
    return this.api.post(this.config.signUpPath, creds)
      .do((resp) => this.saveAuthorization(resp) );
  }

  signIn(email, password): Observable<any> {
    let creds = {user: {
      email: email,
      password: password}}
    return this.api.post(this.config.signInPath, creds)
      .do((resp) => this.saveAuthorization(resp) );
  }

  signOut() {
    return this.api.delete(this.config.signOutPath)
      .do(() => this.removeUser() )
  }

}
