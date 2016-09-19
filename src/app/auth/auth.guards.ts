import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class NotSingedInGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    const isAuth = this.auth.isAuthorized();
    if (isAuth) {
      this.router.navigate(['/projects']);
    }
    return true;
  }

}

@Injectable()
export class SingedInGuard implements CanActivate{
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    const isAuth = this.auth.isAuthorized();
    if (!isAuth) {
      this.router.navigate(['/auth']);
    }
    return true;
  }

}
