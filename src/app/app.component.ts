import { Component, ViewContainerRef } from '@angular/core';
import { AuthService } from './auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuthenticated: boolean = false;
  private viewContainerRef: ViewContainerRef;

  public constructor(private auth:AuthService, private router:Router, viewContainerRef:ViewContainerRef) {
    // You need this small hack in order to catch application root view container ref
    this.viewContainerRef = viewContainerRef;

    this.auth.authenticated$.subscribe(data => {
      this.isAuthenticated = data;
    });
  }

  signOut(): void {
    this.auth.signOut().subscribe(
      resp => {
        console.log(resp);
        this.router.navigate(['/auth']);
      },
      error => console.log(error)
    );
  }
}
