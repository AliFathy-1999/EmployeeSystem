import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AbstractControl,ValidatorFn } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgFor} from '@angular/common';
import { EcxusesService } from '../service/ecxuses.service';


function checkStatusValues(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const validStatusValues = [ 'Pending','Accepted', 'Rejected'];
    return validStatusValues.includes(control.value) ? null : { invalidStatusValue: true };
  };
}
@Component({
  selector: 'app-get-and-apply-for-excuse-dialog',
  templateUrl: './get-and-apply-for-excuse-dialog.component.html',
  styleUrls: ['./get-and-apply-for-excuse-dialog.component.css']
})
export class GetAndApplyForExcuseDialogComponent {
  excuseForm: FormGroup;
  nameMessage!:string;
  oldData!: any;
  errors: any;
  errorMessage: any;

   statusControl = new FormControl('Pending', [Validators.required, checkStatusValues()]);

constructor(private _excuse:EcxusesService,
  private toastr: ToastrService,
  private _dialogRef: MatDialogRef<GetAndApplyForExcuseDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any){
  
    this.excuseForm = new FormGroup({
      respond:this.statusControl ,
    })
  }


ngOnInit(): void {
  this.excuseForm.patchValue(this.data);
}

  submitData(excuseForm: FormGroup) {
    if(this.excuseForm.valid){
      if(this.data){
        
        this._excuse.updateVacationByAdmin(this.data._id,this.excuseForm.value).subscribe({
          next:(val:any)=>{
            this.toastr.success('Excuse Updated successfully');
            this._dialogRef.close(true); 
  
          },
          error: (err) => {
            console.error(err)

          }
        })
      }


    }
   
    }


  // submitData(vacationForm: FormGroup) {
  //     console.log(this.vacationForm.value);
      
  //       console.log(this.vacationForm.value);

  //       this._vacation.addVacationByUser(this.vacationForm.value).subscribe({
        
  //         next:(val:any)=>{
  //           this.toastr.success('Vacation added successfully');
  //           this._dialogRef.close(true); 
  
  //         },
  //         error:(err)=>{
  //         console.error(err)
  //         }
  //       })



   
  //   }
  closeDialog() {
    this._dialogRef.close();
  }
}
