import { Component ,OnInit } from '@angular/core';
import { Attendance } from './employee-attendance.model';
import { AttendanceService } from './employee-attendance.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.css']
})
export class EmployeeAttendanceComponent implements OnInit {
  attendances: Attendance[]= []; // initialize to an empty array
  res:number=0;
  page = 1; // Current page
  limit = 10; // Number of documents per page
 isLoading: boolean = true;
  constructor(private attendanceService: AttendanceService) { }

  ngOnInit() {

    this.getAllAttendancesOfEmployee();

}
getAllAttendancesOfEmployee(){
this.attendanceService.getAllAttendancesOfEmployee(this.page, this.limit).subscribe(
  (response) => {

    this.res=response.totalPages;
    this.attendances = response.data;
    this.isLoading = false; // set isLoading to false once data is loaded

    console.log('this.attendances',this.attendances[0]);
  },
  (error: any) => {
    console.log(error);
  }
);
}


onPaginateChange(event: PageEvent) {
  this.page = event.pageIndex + 1;
  this.limit = event.pageSize;
  this.getAllAttendancesOfEmployee();
}

}
