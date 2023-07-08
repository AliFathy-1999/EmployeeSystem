import { Observable } from 'rxjs';
import { Component, inject } from '@angular/core';

import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/service/global.service';
import { Router } from '@angular/router';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  faArrowUpFromBracket=faArrowUpFromBracket
  dateStatus:Boolean = true
  minDate: Date;
  maxDate: Date;
  currentYear = new Date().getFullYear();
  departments:any;
  selectedFile!: File;
  private fb = inject(FormBuilder);
  file:any
  uploadStatus: boolean = false
  employeeForm :FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[A-Za-z\\s]+$')]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[A-Za-z\\s]+$')]],
    userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$')]],
    confirmPassword: [null, Validators.required],
    nationalId: ['', [Validators.required, Validators.pattern('^(2|3)\\d{1,2}(0[1-9]|1[0-2])(0[1-9]|1\\d|2\\d|3[01])(0[1-9]|1[0123456789]|2[12389]|3[012]|88)(\\d{4})([0-9])$')]],
    DOB: ['', Validators.required,this.isUnder18],
    gender: ['', Validators.required],

    academicQualifications: this.fb.group({
      college: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60), Validators.pattern('^[A-Za-z\\s]+$')]],
      degree: ['', Validators.required],
      institution: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[A-Za-z\\s]+$')]],
      year: ['', Validators.required,,Validators.min(1970), Validators.max(this.currentYear)]
    }),
    hireDate: ['', { validators: Validators.required, asyncValidators: [], updateOn: 'blur' }],
    position: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^[A-Za-z\\s]+$')]],
    jobType: ['', Validators.required],
    depId: ['', Validators.required],
    salary: ['', [Validators.required, Validators.min(3500), Validators.max(200000)]],
    phoneNumber: ['', [Validators.required, Validators.pattern('^(00201|\\+201|01)[0-2,5]{1}[0-9]{8}$')]],
    address: ['', [Validators.required,Validators.minLength(5), Validators.maxLength(150)]],
    pImage: [null, []]
  });

constructor(private _global:GlobalService,private toastr:ToastrService,private router:Router){
  this.employeeForm.setValidators(this.confirmPasswordValidator);
  const currentYear = new Date().getFullYear();
  this.minDate = new Date(currentYear - 70, 0, 1);
  this.maxDate = new Date(currentYear + 0, 11, 31);


  this._global.getSelectedDepartment().subscribe((data:any) =>{
    this.departments = data.data
  })
}

onFileSelect(event: any) {
  this.file = event.target.files
  this.uploadStatus = true
};

  hasUnitNumber = false;
  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordsMismatch: true };
    }

    return null;
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

  onSubmit(employeeForm: FormGroup): void {
    if (this.file != null) {
      const formData = new FormData();
      formData.append('firstName', employeeForm.get('firstName')?.value);
      formData.append('lastName', employeeForm.get('lastName')?.value);
      formData.append('userName', employeeForm.get('userName')?.value);
      formData.append('password', employeeForm.get('password')?.value);
      formData.append('DOB', employeeForm.get('DOB')?.value);
      formData.append('email', employeeForm.get('email')?.value);
      formData.append('gender', employeeForm.get('gender')?.value);
      formData.append('position', employeeForm.get('position')?.value);
      formData.append('hireDate', employeeForm.get('hireDate')?.value);
      formData.append('jobType', employeeForm.get('jobType')?.value);
      formData.append('nationalId', employeeForm.get('nationalId')?.value);
      formData.append('salary', employeeForm.get('salary')?.value);
      formData.append('depId', employeeForm.get('depId')?.value);
      formData.append('academicQualifications[college]', employeeForm.get('academicQualifications')?.get('college')?.value);
      formData.append('academicQualifications[degree]', employeeForm.get('academicQualifications')?.get('degree')?.value);
      formData.append('academicQualifications[institution]', employeeForm.get('academicQualifications')?.get('institution')?.value);
      formData.append('academicQualifications[year]', employeeForm.get('academicQualifications')?.get('year')?.value);
      formData.append('phoneNumber', employeeForm.get('phoneNumber')?.value);
      formData.append('address', employeeForm.get('address')?.value);
      formData.append('pImage', this.file[0]);
      this._global.addEmployee(formData).subscribe((employee:any) => {
        console.log(employee);

        this.toastr.success('Employee added successfully');
        this.router.navigate(['/employeeDetails/' + employee.data._id]);
      },(err:any)=>{
        this.toastr.error("Failed to add employee")
      })
    }
  }
}
