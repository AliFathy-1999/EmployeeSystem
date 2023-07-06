// import { CanActivateFn } from '@angular/router';

// export const homeGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from './service/global.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class homeGuard implements CanActivate {
  constructor(private _auth: GlobalService ,private _router:Router,private _cookieService: CookieService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

  const user=this._auth.currentUser.getValue();
  if(this._auth.currentUser.getValue()!==null){
    if (user.role=="ADMIN") {
      this._router.navigate(['dashboard'])
  }else if(user.role=="USER"){
    this._router.navigate(['me/dash'])
  }
    return false;
  }else{
    return true;
  }
  }

    }