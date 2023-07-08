import { Component } from '@angular/core';
import { Attendance } from './all-employee-attendance.model';
import{AllAttendanceService}from './all-employee-attendance.service';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-all-employee-attendance',
  templateUrl: './all-employee-attendance.component.html',
  styleUrls: ['./all-employee-attendance.component.css']
})
export class AllEmployeeAttendanceComponent {
  attendances: Attendance[]= []; // initialize to an empty array
  res:number=0;
   page = 1; // Current page
   limit = 10; // Number of documents per page
  isLoading: boolean = true;

  constructor(private allAttendanceService: AllAttendanceService) { }

  ngOnInit() {
    this.getAllAttendances();
}
getAllAttendances() {
this.allAttendanceService.getAllAttendances(this.page, this.limit).subscribe(
  (response) => {
    console.log('response.Pages',response.totalPages);
    console.log('response',response);

this.res=response.totalPages;
    this.attendances = response.data;
    this.isLoading = false; // set isLoading to false once data is loaded
    console.log('this.attendances',this.attendances.length * response.totalPages);
},
  (error: any) => {
    console.log(error);
  }
  )
}

onPaginateChange(event: PageEvent) {
  this.page = event.pageIndex + 1;
  this.limit = event.pageSize;
  this.getAllAttendances();
}

}
