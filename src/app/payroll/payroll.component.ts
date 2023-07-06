import {AfterViewInit, Component,OnInit,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator,PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PayrollDialogComponent } from '../payroll-dialog/payroll-dialog.component';
import { SalaryService } from '../service/salary.service';
// import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit , AfterViewInit{

  salary: any[] = [];
  displayedColumns: string[] = ['id', 'grossSalary', 'bonus', 'userrName', 'position', 'deduction', 'netSalary', 'action'];

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  totalCount!: number;
  pageSize = 10;
  currentPageIndex = 1;
  totalPages!: number;

  // ,private toastr:ToastrService

constructor(private _dialog:MatDialog, private _salary: SalaryService){

}


getAllSalary(){
  this._salary.getAllSalary(this.currentPageIndex, 10).subscribe((res:any)=>{
    this.salary = res.data.docs;
    this.dataSource.data = res.data.docs;
    this.totalCount = res.data.totalDocs;
    this.totalPages = res.data.totalPages;
    this.dataSource.paginator = this.paginator;
  })
}

ngOnInit(): void {
  this.getAllSalary();
}


openDialog(){
 const dialogRef= this._dialog.open(PayrollDialogComponent);
 dialogRef.afterClosed().subscribe({
  next:(res:any)=>{
  if(res){
    this.getAllSalary();
    // this.toastr.success("Data Deleted Successfully");
  }  
  }
})
}


ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}


deletePayroll(id:number){
  this._salary.deleteEmployeeSalaryById(id).subscribe((res:any)=>{
    this.getAllSalary();
  })
  }
  
  onPageChanged(event: PageEvent) {
    const newPageIndex = event.pageIndex;
    const newPageSize = event.pageSize;
    if (newPageIndex !== this.currentPageIndex || newPageSize !== this.pageSize) {
      this.currentPageIndex = newPageIndex;
      this.pageSize = newPageSize;
      this._salary.getAllSalary(this.currentPageIndex, this.pageSize).subscribe((result : any) => {
        this.salary=result.data.docs;
        this.totalCount = result.data.totalDocs;
        this.dataSource = new MatTableDataSource(this.salary);
        this.dataSource.paginator = this.paginator;
      });
    }
  }
  
  onPreviousPage() {
    if (this.currentPageIndex > 1) {
      this.currentPageIndex--;
      this._salary.getAllSalary(this.currentPageIndex, 10).subscribe((result:any) => {
        this.salary = result.data.docs;
        this.totalCount = result.data.totalDocs;
        this.dataSource = new MatTableDataSource(this.salary);
        this.dataSource.paginator = this.paginator;
      });
    }
  }
  
  onNextPage() {
    if (this.currentPageIndex < this.totalPages) {
      this.currentPageIndex++;
      this._salary.getAllSalary(this.currentPageIndex, 10).subscribe((result:any) => {
        this.salary = result.data.docs;
        this.totalCount = result.data.totalDocs;
        this.dataSource = new MatTableDataSource(this.salary);
        this.dataSource.paginator = this.paginator;
      });
    }
  }
  
  openEditDialog(data:any){
    const dialogRef=this._dialog.open(PayrollDialogComponent,{
      data
     })
    dialogRef.afterClosed().subscribe((res:any)=>{
      if(res){
        this.getAllSalary();
      }
     })
  }

}
