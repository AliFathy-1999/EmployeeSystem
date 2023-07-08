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
  employeeData = {
    _id:'',
    firstName: '',
    lastName: '',
    nationalId: '',
    DOB: '',
    gender: '',
    academicQualifications: {
      college: '',
      degree: '',
      institution: '',
      year: ''
    },
    hireDate: '',
    position: '',
    jobType: '',
    depId:{ _id:'',name:''},
    salary: '',
    phoneNumber: '',
    address: '',
    pImage:''
  };
  userRole:any;
  isAdmin:boolean = false;
  constructor(private _global:GlobalService,public route:ActivatedRoute){
    this.empId = this.route.snapshot.params['id'];
    this.userRole = this._global.currentUser["_value"].role
    if(this.userRole == "ADMIN"){
      this.isAdmin = true;
    }
  }
  ngOnInit(): void {
    this._global.getEmployeeDetails(this.empId).subscribe((data:any) => {
      this.employeeData = data.data[0];
    });
  }
}
