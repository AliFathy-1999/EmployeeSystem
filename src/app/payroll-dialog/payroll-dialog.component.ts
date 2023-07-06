import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalaryService } from '../service/salary.service';

@Component({
  selector: 'app-payroll-dialog',
  templateUrl: './payroll-dialog.component.html',
  styleUrls: ['./payroll-dialog.component.css']
})



export class PayrollDialogComponent implements OnInit{

  nameMessage!:string
  catMessage!:string
  bonus!:Number
  grossSalary!:Number
  oldData!: SalaryData;
  toastr: any;

    payrollObj:object={
      bonus:Number,
      grossSalary:Number
    }
  
  constructor(private _salary : SalaryService, private _dialogRef: MatDialogRef<PayrollDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  payrollForm = new FormGroup({
    bonus: new FormControl(null, [Validators.required, Validators.min(0)]),
    grossSalary: new FormControl(null, [Validators.required,Validators.min(3500), Validators.max(200000)]),
  });

  submitData(payrollForm: FormGroup) {
    if (this.data) {
      if (this.payrollForm.valid) {
        const payrollObj = {
          bonus: payrollForm.get('bonus')?.value !== null && payrollForm.get('bonus')?.value !== undefined ? payrollForm.get('bonus')?.value : 0,
          grossSalary: payrollForm.get('grossSalary')?.value ? payrollForm.get('grossSalary')?.value : this.oldData.grossSalary
        };
        this._salary.editSalary(this.data.employeeId._id, payrollObj).subscribe({
        next:(res: any) => {
          this._dialogRef.close(true);
          // this.toastr.success("Data Updated Successfully");
        },
        error:  (error: any) => {
          console.log(this.data.employeeId._id)
          // this.toastr.error(error.error.message);
        }
        })
     }
    }
    }
  ngOnInit(): void {
    this.payrollForm.patchValue(this.data);
  }

  closeDialog() {
    this._dialogRef.close();
  }

}
interface SalaryData {
  bonus: Number;
  grossSalary: Number;
}