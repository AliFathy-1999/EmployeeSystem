import { Vacation } from './../vacation';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgFor} from '@angular/common';
import { VocationServiceService } from '../service/vocation-service.service';
import { Status } from './../vacation';
import { AddVacationComponent } from '../add-vacation/add-vacation.component';

// interface Vacations {
//   status: string;
//   viewStatus: string;
// }
                                        //ADMIN//
@Component({
  selector: 'app-vacation-dialog',
  templateUrl: './vacation-dialog.component.html',
  styleUrls: ['./vacation-dialog.component.css']
})
export class VacationDialogComponent {
  nameMessage!:string
  status!: Status;
  employeeId!: Number;
  totalDays!: Number;
  vacationObj:object={
    employeeId:Number,
    totalDays:Number,
    status: Status
  }
  oldData:any

  constructor(
    private _vacation:VocationServiceService,
    private toastr: ToastrService,
    private _dialogRef: MatDialogRef<VacationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  vacationForm = new FormGroup({
    employeeId: new FormControl(null, [Validators.required]),
    status: new FormControl(null, [Validators.required]),
    totalDays: new FormControl(null, [Validators.required,Validators.min(0)]),
  });



  submitData(vacationForm: FormGroup) {
    if(this.vacationForm.valid){
      if(this.data){
        
        this._vacation.updateVacationByAdmin(this.data._id,this.vacationForm.value).subscribe({
          next:(val:any)=>{
            this.toastr.success('Vacation Updated successfully');
            this._dialogRef.close(true); 
  
          },
          error: (HttpErrorResponse) => {
            this.toastr.error(HttpErrorResponse.error.message)
          }
        })
      }else{
        console.log(this.vacationForm.value);

        this._vacation.addVacationByAdmin(this.vacationForm.value).subscribe({
        
          next:(val:any)=>{
            this.toastr.success('Vacation added successfully');
            this._dialogRef.close(true); 
  
          },
          error: (HttpErrorResponse) => {
            this.toastr.error(HttpErrorResponse.error.message)
          }
        })
      }


    }
   
    }



    ngOnInit(): void {
      if (this.data) { 
        this.vacationForm.patchValue({
          employeeId: this.data.employeeId._id, 
          status: this.data.status,
          totalDays: this.data.totalDays
        });
      }
    }
  closeDialog() {
    this._dialogRef.close();
  }
}
