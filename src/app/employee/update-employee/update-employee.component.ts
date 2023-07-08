import { Component, inject, ViewChild,ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})

export class UpdateEmployeeComponent {
  file:any
  uploadStatus: boolean = false
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
    address: '',
    pImage:''
  };
  currentYear = new Date().getFullYear();
  departments:any;
  empId : any;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  private fb = inject(FormBuilder);
  employeeForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[A-Za-z\\s]+$')]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('^[A-Za-z\\s]+$')]],
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

constructor(private _global:GlobalService,private toastr:ToastrService,
  private route: ActivatedRoute,private router:Router){
  this.empId = this.route.snapshot.params['id'];
  this.employeeForm.setValidators(this.confirmPasswordValidator);
  this._global.getSelectedDepartment().subscribe((data:any) =>{
    this.departments = data.data
  })
  this._global.getEmployeeDetails(this.empId).subscribe((data:any) => {
    this.employeeData = data.data[0];
    this.file = this.employeeData.pImage
  });
}
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

  onFileSelect(event: any) {
    this.file = event.target.files
    this.uploadStatus = true
  };
    onSubmit(employeeForm: FormGroup): void {
      if (this.file != null) {
        const formData = new FormData();
        formData.append('firstName', employeeForm.get('firstName')?.value);
        formData.append('lastName', employeeForm.get('lastName')?.value);
        formData.append('DOB', employeeForm.get('DOB')?.value);
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
        this._global.updateEmployee(this.empId,formData).subscribe(employee => {
          this.toastr.success('Employee Updated successfully');
          this.router.navigate(['/employeeDetails/' + this.empId])
        },(err:any)=>{
          this.toastr.error("Error in updating employee, please check your entered data")
        })
      }
    }
}
