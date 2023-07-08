
import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {MatBadgeModule} from '@angular/material/badge';
import { EmployeeMessagesService } from '../service/employee-messages.service';
import { AnnouncementService } from '../service/announcement.service';
import { interval } from 'rxjs';
import { EmployeeMessagesComponent } from '../employee-messages/employee-messages.component';

@Component({
  selector: 'app-employee-nav',
  templateUrl: './employee-nav.component.html',
  styleUrls: ['./employee-nav.component.css']
})
export class EmployeeNavComponent {
  messageNotifications :boolean = false;
  announcementNotifications :boolean = false;
  currentUser = {role:'USER'}
  announcements :any ;
  empMessages:any ;
  private breakpointObserver = inject(BreakpointObserver);
  menuItems = ['me','me/payroll','employeeVacation','getMyCasualVacations'];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    constructor(private router:Router , private _EmployeeMessages :EmployeeMessagesService ,
       private _Announcements:AnnouncementService){

        this._EmployeeMessages.getUserLastMessage().subscribe((res:any)=>{
 
          this.empMessages = res.data

        })

        this._Announcements.getLastAnnouncement().subscribe((res:any)=>{
 
          this.announcements = res.data

        })

        this.checkifNewAnnouncements()
        this.checkifNewMessages()

    }
    gotopage(page:string){
      this.router.navigate([`${page}`])
    }


    toggleMessageBadgeVisibility(){
      this.messageNotifications = false
    };
    toggleAnnouncementBadgeVisibility(){
      this.announcementNotifications = false
    };

    checkifNewMessages(){
console.log("nen")
      interval(4000).subscribe(() => {
        console.log("send")
        this._EmployeeMessages.getUserLastMessage().subscribe((res:any)=>{

          console.log(res.data,this.empMessages)
        if(res.data.length>this.empMessages.length){
          this.messageNotifications = true
          console.log("recieved")
          this.empMessages=res.data
        }
        });
      });
    }

    checkifNewAnnouncements(){

      interval(4000).subscribe(() => {
        console.log("send")
        this._Announcements.getLastAnnouncement().subscribe((res:any)=>{
          console.log(res.data,this.announcements)
        if(res.data.length>this.announcements.length){
          this.announcementNotifications= true
          console.log("recieved")
          this.announcements=res.data
        }
        });
      });
    }


  }


       