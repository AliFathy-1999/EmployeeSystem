import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServiceService } from '../holiday/service.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-holiday-dialog',
  templateUrl: './holiday-dialog.component.html',
  styleUrls: ['./holiday-dialog.component.css']
})
export class HolidayDialogComponent {

  nameMessage!:string
  catMessage!:string
  oldData!: holidayData;
  holidayForm!:FormGroup ;

    holidayObj:object={
      holidayName:String,
      holidayDate:Date,
      noOfDays:Number
    }

    notEmptyValidator(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const value = control.value ? control.value.trim() : '';
        return value.length === 0 ? { 'notEmpty': true } : null;
      };
    }

  constructor(private _holiday : ServiceService, private toastr:ToastrService, private _dialogRef: MatDialogRef<HolidayDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      this.holidayForm = new FormGroup({
        holidayName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(100),this.notEmptyValidator()]),
        holidayDate: new FormControl(null, [Validators.required]),
        noOfDays: new FormControl(null, [Validators.required, Validators.min(1)]),
      });


      // if (this.data) {
      //   this.holidayForm.controls['holidayName'].setValue(this.data.holidayName);
      //   this.holidayForm.controls['holidayDate'].setValue(moment(this.data.holidayDate).format('YYYY-MM-DD'));
      //   this.holidayForm.controls['noOfDays'].setValue(this.data.noOfDays);
      // }
  }



  submitData(holidayForm: FormGroup) {
    if (this.data) {
      const holidayObj = {
        holidayName: holidayForm.get('holidayName')?.value ? holidayForm.get('holidayName')?.value : this.oldData.holidayName,
        holidayDate: holidayForm.get('holidayDate')?.value ? moment.utc(holidayForm.get('holidayDate')?.value).local().add(moment().utcOffset(), 'minutes').format() : this.oldData.holidayDate,
        noOfDays: holidayForm.get('noOfDays')?.value != null ? holidayForm.get('noOfDays')?.value : this.oldData.noOfDays
      };
      this._holiday.editHoliday(this.data._id, holidayObj).subscribe({
        next: (res: any) => {
          this._dialogRef.close(true);
        },
        error: (HttpErrorResponse) => {
          this.toastr.error(HttpErrorResponse.error.message);
        }
      });
    } else {
      const holidayName = holidayForm.get('holidayName');
      const holidayDate = holidayForm.get('holidayDate');
      const noOfDays = holidayForm.get('noOfDays');
      if(holidayName && holidayDate && noOfDays){
        const holidayObj = {
          holidayName: holidayName.value,
          holidayDate: holidayForm.get('holidayDate')?.value ? moment.utc(holidayForm.get('holidayDate')?.value).local().add(moment().utcOffset(), 'minutes').format() : this.oldData.holidayDate,
          noOfDays: noOfDays?.value != null ? noOfDays?.value: 0
        };
        this._holiday.createHoliday(holidayObj).subscribe({
          next: (res: any) => {
            this._dialogRef.close(true);
          },
          error: (HttpErrorResponse) => {
            this.toastr.error(HttpErrorResponse.error.message);
          }
        });
      }
    }
  }
  
  ngOnInit(): void {
    this.holidayForm.patchValue(this.data);
  }

  closeDialog() {
    this._dialogRef.close();
  }

}
interface holidayData {
  holidayName:String,
  holidayDate:Date,
  noOfDays:Number
}
