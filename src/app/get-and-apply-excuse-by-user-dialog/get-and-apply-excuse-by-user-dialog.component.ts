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

function checkExcuseValues(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const validExcuseValues = [ 'Late','Leave Early'];
    return validExcuseValues.includes(control.value) ? null : { invalidExcuseValue: true };
  };
}
@Component({
  selector: 'app-get-and-apply-excuse-by-user-dialog',
  templateUrl: './get-and-apply-excuse-by-user-dialog.component.html',
  styleUrls: ['./get-and-apply-excuse-by-user-dialog.component.css']
})

export class GetAndApplyExcuseByUserDialogComponent {
  excuseForm: FormGroup;
  nameMessage!:string;
  oldData!: any;
  errors: any;
  errorMessage: any;
  excuseControl = new FormControl('Late', [Validators.required, checkExcuseValues()]);

  constructor(private _excuse:EcxusesService,
    private toastr: ToastrService,
    private _dialogRef: MatDialogRef<GetAndApplyExcuseByUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any){
    
      this.excuseForm = new FormGroup({
        reason: new FormControl(null, [Validators.required]),
        Day: new FormControl( new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().substring(0, 10), [Validators.required]),
        from: new FormControl(new Date().toLocaleTimeString(), [Validators.required]),
        to: new FormControl(new Date().toLocaleTimeString(), [Validators.required]),
        typeOfExcuse: this.excuseControl      
      });

      
// const fromControl = this.excuseForm.get('from');
// if (fromControl) {
//   fromControl.setValue(new Date(fromControl.value).toLocaleString());
// }

// const toControl = this.excuseForm.get('to');
// if (toControl) {
//   toControl.setValue(new Date(toControl.value).toLocaleString());
// }
    }
    
    ngOnInit(): void {
      this.excuseForm.patchValue(this.data);
    }
    

    submitData(excuseForm: FormGroup) {
      // if(this.excuseForm.valid){
        if(this.data){
          
          this. _excuse.updateExcuseByUser(this.data._id,this.excuseForm.value).subscribe({
            next:(val:any)=>{
              this.toastr.success('Excuse Updated successfully');
              this._dialogRef.close(true); 
    
            },
            error: (HttpErrorResponse) => {
              this.toastr.error(HttpErrorResponse.error.message)
            }
          })
        }else{
          console.log(this.excuseForm.value);
  
          this. _excuse.addExcuseByUser(this.excuseForm.value).subscribe({
          
            next:(val:any)=>{
              this.toastr.success('Excuse added successfully');
              this._dialogRef.close(true); 
    
            },
            error: (HttpErrorResponse) => {
              this.toastr.error(HttpErrorResponse.error.message)
            }
          })
        }
  
  
      // }
     
      }
      closeDialog() {
        this._dialogRef.close();
      }
  
  
}
