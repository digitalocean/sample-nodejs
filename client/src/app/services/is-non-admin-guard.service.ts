import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { IUser, UserType } from '../shared/types';

@Injectable({
  providedIn: 'root'
})
export class IsNonAdminGuardService {

  constructor(private _router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
    const user = localStorage.getItem('user');

    if (user) {
      const userObj: IUser = JSON.parse(user);
      if (userObj.type === UserType.EMP) {
        return true;
      }
    }
    this._router.navigate(["/admin-dashboard"]);
    return false;
  }
}
