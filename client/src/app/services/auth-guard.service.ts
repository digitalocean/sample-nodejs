import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _snackBar: MatSnackBar, private _router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    const user = localStorage.getItem('user');
    if (!user) {
      this._snackBar.open("You need to login first!", "", {
        duration: 3000
      });
      this._router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
