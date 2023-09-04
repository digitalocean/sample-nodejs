import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserType } from '../shared/types';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService  implements CanActivate{

  constructor(private _snackBar: MatSnackBar, private _router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const user = localStorage.getItem('user');
    if (user) {
      const userObj = JSON.parse(user);
      this._snackBar.open("You are already logged in.", "", {
        duration: 3000
      });
      if (userObj.type === UserType.ADMIN) {
        this._router.navigate(['/']);
      } else if (userObj.type === UserType.EMP) {
        this._router.navigate(['/non-admin-dashboard']);
      }
      return false;
    }
    return true;
  }
}
