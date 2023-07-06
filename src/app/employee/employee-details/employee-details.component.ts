import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit{
  empId:any;
  employeeData:any;
  constructor(private _global:GlobalService,public route:ActivatedRoute){
    this.empId = this.route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this._global.getEmployeeDetails(this.empId).subscribe((data:any) => {
      this.employeeData = data.data[0];
    });
  }
}
