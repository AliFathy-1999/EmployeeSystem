// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { GlobalService } from '../service/global.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  // constructor(private _authService: GlobalService) {}
  // token = this._authService.getToken()
  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   if(this.token){
  //     return next.handle(request.clone({ setHeaders: { Authorization: `brearer ${this.token}` } }));
  //   }
  //   return next.handle(request);
  // }

  constructor(private _authService: GlobalService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this._authService.getToken();
    if (myToken) {
      const modifiedRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${myToken}`),
      });
      return next.handle(modifiedRequest).pipe(
        tap((response) => {
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
    }
 
    return next.handle(request);
  }
}
