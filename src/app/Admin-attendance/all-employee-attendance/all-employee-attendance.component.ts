import { Component } from '@angular/core';
import { Attendance } from './all-employee-attendance.model';
import{AllAttendanceService}from './all-employee-attendance.service';
@Component({
  selector: 'app-all-employee-attendance',
  templateUrl: './all-employee-attendance.component.html',
  styleUrls: ['./all-employee-attendance.component.css']
})
export class AllEmployeeAttendanceComponent {
  attendances: Attendance[]= []; // initialize to an empty array
  isLoading: boolean = true;

  constructor(private allAttendanceService: AllAttendanceService) { }

  ngOnInit() {
  const page = 1; // Current page
  const limit = 10; // Number of documents per page
    this.allAttendanceService.getAllAttendances(page, limit).subscribe(
    (response) => {
      console.log('response',response);

      this.attendances = response.data;
      this.isLoading = false; // set isLoading to false once data is loaded

      console.log('this.attendances',this.attendances[0]);
  },
    (error: any) => {
      console.log(error);
    }
    )
}


getAttendance(pageIndex: number = 0, pageSize: number = 5) {
    this.allAttendanceService.getAllAttendances(pageIndex+ 1, pageSize).subscribe(
    (response) => {
      console.log('response',response);

      this.attendances = response.data;
      this.isLoading = false; // set isLoading to false once data is loaded

      console.log('this.attendances',this.attendances[0]);
  },
    (error: any) => {
      console.log(error);
    }
    )
}

onPaginateChange(event: any) {
  const pageIndex = event.pageIndex;
  const pageSize = event.pageSize;
  this.getAttendance(pageIndex, pageSize);
}

}
