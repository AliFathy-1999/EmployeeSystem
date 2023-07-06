// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { GlobalService } from './service/global.service';
import { Observable, map, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private _auth: GlobalService ,private _router:Router,private _cookieService: CookieService){}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {

  const user=this._auth.currentUser.getValue();
  if(this._auth.currentUser.getValue()!==null){
    return true;
  }else{
    this._router.navigate(['/']);
    return false;
  }

  }
}
