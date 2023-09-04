import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  isLoginUrl: boolean = false;

  constructor(private _router: Router) {
    this._router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          if (this._router.url === "/login" || this._router.url === "/register" || this._router.url === "/resetpassword" ) {
            this.isLoginUrl = true;
          } else {
            this.isLoginUrl = false;
          }
        }
      }
    );
  }
}
