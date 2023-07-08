import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.css']
})
export class UpdateDepartmentComponent {
  private fb = inject(FormBuilder);
  employees:any
  departmentForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern(/^[A-Za-z\s]+$/)]],
    description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255), Validators.pattern(/^[A-Za-z\s]+/)]],
    managerId: ['', Validators.required],
  });
  depId:any;
  depData = {
    name: '',
    description: '',
    managerId: {
      _id: '',
      firstName: '',
      lastName: '',
    },
  };
  constructor(private depService:DepartmentService,private toastr:ToastrService,
    private route: ActivatedRoute,private router:Router){
    this.depId = this.route.snapshot.params['id'];
    this.depService.getDepartment(this.depId).subscribe((res:any) => {
      this.depData = res.data;
    });
    this.depService.getSelectedEmployees().subscribe((employee:any)=>{
      this.employees = employee.data
    })
  }
  onSubmit(){
    this.depService.updateDepartment(this.depId,this.departmentForm.value).subscribe((department:any) => {
      this.toastr.success('Editied Department Successfully');
      this.router.navigate(['/alldepartments']);
  },(err:Error)=>{
    this.toastr.error(err.message)
  })
  }
}
