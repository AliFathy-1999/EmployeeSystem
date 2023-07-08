import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent {
  private fb = inject(FormBuilder);
  employees:any
  departmentForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[A-Za-z\s]+$/)]],
    description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255), Validators.pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9\s]*$/)]],
    managerId: ['', Validators.required],
  });
  constructor(private router: Router, private depService:DepartmentService,private toastr:ToastrService){
    this.depService.getSelectedEmployees().subscribe((employee:any)=>{
      this.employees = employee.data
    })
  }
  onSubmit(){
    this.depService.addDepartment(this.departmentForm.value).subscribe((department:any) => {
        this.toastr.success('Add Department Successfully');
        this.router.navigate(['/allDepartments']);
    },(err:Error)=>{
      this.toastr.error(err.message)
    })
  }

}
