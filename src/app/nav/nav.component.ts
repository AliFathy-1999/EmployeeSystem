import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalService } from '../service/global.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {


 
  menuItems: string[] = [];
  
  user: any = this.global.currentUser.getValue();


  constructor(private breakpointObserver: BreakpointObserver, private global: GlobalService, private router: Router) {
    this.global.saveCurrentUser();
    if (this.user && this.user.role == 'ADMIN') {
      this.menuItems = ['dashboard','addEmployee', 'getAllEmployees', 'payroll', 'addVacation','allAttendance','checkinCheckout','Messages','Announcements'];
    } else if(this.user && this.user.role == 'USER'){
      this.menuItems = ['me','me/payroll', 'employeeVacation','employeeAttendance'];
    }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  gotopage(page:string){
    this.router.navigate([`${page}`]);
  }
  logout(){
    this.global.isLogOut()
  }
}
