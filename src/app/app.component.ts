import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employeeXpert';
  constructor( private _cookieService: CookieService, private _router: Router){
  }
  isLoggedIn(): boolean {
    return this._cookieService.check('token');
  }
}
