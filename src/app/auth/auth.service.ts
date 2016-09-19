import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api';
import { AuthConfig } from './config';
import { Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/Rx';

@Injectable()
export class AuthService {
  public authenticated$:BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private api: ApiService, private config: AuthConfig) {
    let email = localStorage.getItem(this.config.emailName) || this.getUrlVariable('user[email]');
    let token = localStorage.getItem(this.config.tokenName) || this.getUrlVariable('user[token]');
    if (email && token) {
      this.setUser(email, token);
    }
  }

  private removeUser() {
    localStorage.removeItem(this.config.emailName);
    localStorage.removeItem(this.config.tokenName);
    this.api.resetHeaders();
    this.authenticated$.next(false);
  }

  private setUser(email: string, token: string) {
    localStorage.setItem(this.config.emailName, email);
    localStorage.setItem(this.config.tokenName, token);
    this.api.setHeaders({
      [this.config.emailName]: email,
      [this.config.tokenName]: token
    });
    this.authenticated$.next(true);
  }

  private handleResponse(response) {
    if (response.user && response.user.email && response.user.token){
      this.setUser(response.user.email, response.user.token);
    } else {
      let error = new Error('Wrong user credentials');
      error['response'] = response;
      throw error;
    }
  }

  // decode omniauth callback
  private getUrlVariable(variable: string): string {
    let query = decodeURI(window.location.search).substring(1);
    let vars = query.split("&");
    for (let i=0;i<vars.length;i++) {
      let pair = vars[i].split("=");
      if( pair[0] == variable ) {
        console.log(decodeURIComponent(pair[1]));
        return decodeURIComponent(pair[1]);
      }
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
      .do((resp) => this.handleResponse(resp) );
  }

  signIn(email, password): Observable<any> {
    let creds = {user: {
      email: email,
      password: password}}
    return this.api.post(this.config.signInPath, creds)
      .do((resp) => this.handleResponse(resp) );
  }

  signOut() {
    return this.api.delete(this.config.signOutPath)
      .do(() => this.removeUser() )
  }

  facebook(): void {
    let authUrl = this.config.apiUrl + this.config.facebookPath;
    authUrl += '?auth_origin_url=' + encodeURIComponent(window.location.href);
    authUrl += '?omniauth_window_type=sameWindow';

    window.location.replace(authUrl);
  }

}
