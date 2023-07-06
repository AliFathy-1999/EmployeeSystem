// import { CanActivateFn } from '@angular/router';

// export const roleGuardGuard: CanActivateFn = (route, state) => {
//   return true;
// };
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { GlobalService } from './service/global.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {

constructor(private _auth: GlobalService ,private _router:Router){

}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user=this._auth.currentUser.getValue();
    const allowedRoles = route.data['allowedRoles'];
    if (allowedRoles.includes(user.role)) {
      return true;
  }
  else {
      this._router.navigate(['me/dash']);
      return false;
  }
}
  }
  