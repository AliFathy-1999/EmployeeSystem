import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconButton } from '@angular/material/button';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { casualVacations } from '../casualVacations';
import { CasualVacationsService } from '../service/casual-vacations.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-casual-vacations',
  templateUrl: './casual-vacations.component.html',
  styleUrls: ['./casual-vacations.component.css']
})
export class CasualVacationsComponent {
constructor( private _casualvacation:CasualVacationsService,
  private toastr: ToastrService,
  private _dialogRef: MatDialogRef<CasualVacationsComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any){}
  casualVacationForm = new FormGroup({
    reasonForVacation: new FormControl({ value: 'casual Vacation', disabled: true }),
    status: new FormControl({ value: 'Accepted', disabled: true }),
    Day: new FormControl({ value: new Date().toISOString().substring(0, 10), disabled: true }),
    totalCasDays: new FormControl(1,[Validators.required,Validators.max(2)]),

  });


  submitData(casualVacationForm: FormGroup) {
    if(this.casualVacationForm.valid){
     
        console.log(this.casualVacationForm.value);

        this._casualvacation.addCasualVacation(this.casualVacationForm.value).subscribe({
        
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

    closeDialog() {
      this._dialogRef.close();
    }

}
