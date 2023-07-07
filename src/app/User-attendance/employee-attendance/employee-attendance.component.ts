import { Component ,OnInit } from '@angular/core';
import { Attendance } from './employee-attendance.model';
import { AttendanceService } from './employee-attendance.service';

@Component({
  selector: 'app-employee-attendance',
  templateUrl: './employee-attendance.component.html',
  styleUrls: ['./employee-attendance.component.css']
})
export class EmployeeAttendanceComponent implements OnInit {
  attendances: Attendance[]= []; // initialize to an empty array
  isLoading: boolean = true;

  constructor(private attendanceService: AttendanceService) { }

  ngOnInit() {
  const page = 1; // Current page
  const limit = 10; // Number of documents per page

  this.attendanceService.getAllAttendancesOfEmployee(page, limit).subscribe(
    (response) => {

      this.attendances = response.data;
      this.isLoading = false; // set isLoading to false once data is loaded

      console.log('this.attendances',this.attendances[0]);
    },
    (error: any) => {
      console.log(error);
    }
  );
}

}
