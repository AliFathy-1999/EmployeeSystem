import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/service/global.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements  OnInit{
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
  constructor(private _global:GlobalService,public route:ActivatedRoute,private location: Location){

  }
  goBack(): void {
    this.location.back();
  }
  ngOnInit(): void {
    this._global.getMe().subscribe((data:any) => {
      this.employeeData = data.data;
    });
  }
}
