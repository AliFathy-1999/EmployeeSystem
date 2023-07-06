import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroupDirective, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/service/global.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})

export class AddEmployeeComponent implements OnInit{
  employeeForm: any;
  hidePassword:String = 'password'
  departments:any;
  currentYear = new Date().getFullYear();
  constructor(private formBuilder: FormBuilder,private _global:GlobalService,private toastr: ToastrService){
    this._global.getSelectedDepartment().subscribe((data:any) =>{
      this.departments = data.data
    })
  }
  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[A-Za-z\\s]+$')]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[A-Za-z\\s]+$')]],
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$')]],
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
  onSubmit(){
    this._global.addEmployee(this.employeeForm.value).subscribe(employee => {
      this.toastr.success('success');
    },(err:Error)=>{
      this.toastr.error(err.message)
    })
  }
}
