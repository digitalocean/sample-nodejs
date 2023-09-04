import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser, UserType } from '../shared/types';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuardService implements CanActivate {

  constructor(private _router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const user = localStorage.getItem('user');

    if (user) {
      const userObj: IUser = JSON.parse(user);
      if (userObj.type === UserType.ADMIN) {
        return true;
      }
    }
    this._router.navigate(["/non-admin-dashboard"]);
    return false;
  }
}
