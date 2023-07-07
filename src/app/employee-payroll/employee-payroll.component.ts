import { Component } from '@angular/core';
import { SalaryService } from '../service/salary.service';

@Component({
  selector: 'app-employee-payroll',
  templateUrl: './employee-payroll.component.html',
  styleUrls: ['./employee-payroll.component.css']
})
export class EmployeePayrollComponent {

  constructor(private _salary: SalaryService){

  }
  salary: any;
  loading: boolean = true;

  
  getAllSalary(){
    this._salary.getEmployeeSalary().subscribe((res:any)=>{
      this.salary = res.data;
      this.loading=false;


    })
  }
  
  ngOnInit(): void {
    this.getAllSalary();
  }


}
