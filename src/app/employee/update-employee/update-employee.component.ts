import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/service/global.service';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {
  message : string = ""
  employeeData = {
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
    address: ''
  };
  employeeForm:any;
  empId : any;
  employee: any;
  employeeDataAPI:any
  departments:any;
  hidePassword:String = 'password'
  currentYear = new Date().getFullYear();
  isUpdated:Boolean = false;
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute, private _global: GlobalService) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[A-Za-z\\s]+$')]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[A-Za-z\\s]+$')]],
      nationalId: ['', [Validators.required, Validators.pattern('^(2|3)\\d{1,2}(0[1-9]|1[0-2])(0[1-9]|1\\d|2\\d|3[01])(0[1-9]|1[0123456789]|2[12389]|3[012]|88)(\\d{4})([0-9])$')]],
      DOB: ['', Validators.required,this.isUnder18],
      gender: ['', Validators.required],

      academicQualifications: this.formBuilder.group({
        college: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60), Validators.pattern('^[A-Za-z\\s]+$')]],
        degree: ['', Validators.required],
        institution: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[A-Za-z\\s]+$')]],
        year: ['', Validators.required,,Validators.min(1970), Validators.max(this.currentYear)]
      }),
      hireDate: ['', Validators.required,Validators.min(1970), Validators.max(this.currentYear)],
      position: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[A-Za-z\\s]+$')]],
      jobType: ['', Validators.required],
      depId: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(3500), Validators.max(200000)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^(00201|\\+201|01)[0-2,5]{1}[0-9]{8}$')]],
      address: ['', [Validators.required,Validators.minLength(5), Validators.maxLength(150)]],
    });
    this.empId = this.route.snapshot.params['id'];
    this._global.getSelectedDepartment().subscribe((data:any) =>{
      this.departments = data.data
    })
    this._global.getEmployeeDetails(this.empId).subscribe((data:any) => {
      this.employeeData = data.data[0];
    });
  }
  isUnder18(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise((resolve) => {
      const newyear = new Date();
      const userBirthdate = new Date(control.value);
      const ageDiff = (newyear.getFullYear() - userBirthdate.getFullYear());
      const isUnder18 = ageDiff < 18

      if (!isUnder18) {
        resolve(null);
      } else {
        resolve({ isUnder18: true });
      }
  })
  }
  onSubmit() {
    this._global.updateEmployee(this.empId, this.employeeForm.value).subscribe(data => {
      this.ngOnInit();
      setTimeout(() => {
        this.isUpdated = true;
      }, 2000);

      this.message = "Employee updated successfully"
    },(err)=>{
      this.isUpdated = true;
      this.message = "Failed to update Employee"
    });
  }

}
