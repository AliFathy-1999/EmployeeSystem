import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VocationServiceService } from '../service/vocation-service.service';

@Component({
  selector: 'app-employee-add-vacation-dialog',
  templateUrl: './employee-add-vacation-dialog.component.html',
  styleUrls: ['./employee-add-vacation-dialog.component.css']
})
export class EmployeeAddVacationDialogComponent {
constructor(private _vacation:VocationServiceService, private _dialog:MatDialog ){}


}
