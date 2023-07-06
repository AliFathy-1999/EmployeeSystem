import {AfterViewInit, Component,OnInit,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconButton } from '@angular/material/button';
import { VocationServiceService } from '../service/vocation-service.service';
import { VacationDialogComponent } from '../vacation-dialog/vacation-dialog.component';
import {Vacation} from '../vacation';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-employee-vacation',
  templateUrl: './employee-vacation.component.html',
  styleUrls: ['./employee-vacarion.component.css']
})
export class EmployeeVacarionComponent {
  data!: any;
  totalCount!:number
  pageSize:number=10;
  
  ngOnInit(): void {
    this.getAllEmployeeVacations();
      }
      constructor(private _vacation:VocationServiceService, private _dialog:MatDialog){}
      vacations:Vacation[]=[]
      currentPageIndex:number=0
      totalPages!:number
      
      // openDialog(){
      //   const dialogRef= this._dialog.open(EmployeeDialogComponent);
      //   dialogRef.afterClosed().subscribe({
      //    next:(res:any)=>{
      //    if(res){
      //      this.getAllEmployeeVacations();
      //    }
      //    }
      //  })
      //  }


       
 displayedColumns: string[] = [ '_id','reasonForVacation','fromDay','toDay','status','action'];
         dataSource = new MatTableDataSource<Vacation>();
         @ViewChild(MatPaginator) paginator!: MatPaginator;
       
         ngAfterViewInit() {
           this.dataSource.paginator = this.paginator;
         }

        //  openEditDialog(data:any){
        //   const dialogRef=this._dialog.open(EmployeeDialogComponent,{
        //       data
        //      })
        //      console.log(data)
        //     dialogRef.afterClosed().subscribe((res:any)=>{
        //       if(res){
        //         this.getAllEmployeeVacations();
        //       }
        //      })
        //   }

        getAllEmployeeVacations(){
         this._vacation.getAllEmployeeVacations(this.currentPageIndex, this.pageSize).subscribe((res:any)=>{
        //  this.vacations=res.allVacations;
         this.totalCount=res.vacations.totalCount
         this.totalPages=res.vacations.totalPages
        //  this.dataSource=new MatTableDataSource(this.vacations);
         this.dataSource.data = res.vacations;
         console.log(res.vacations);
         console.log("res.allVacations",res.vacations[0].employeeId);
         this.dataSource.paginator=this.paginator;
         })
       }
      //  updateData(payrollForm: FormGroup) {
      //   if (this.data) {
      //     if (this.payrollForm.valid) {
      //       const payrollObj = {
      //         bonus: payrollForm.get('bonus')?.value !== null && payrollForm.get('bonus')?.value !== undefined ? payrollForm.get('bonus')?.value : 0,
      //         grossSalary: payrollForm.get('grossSalary')?.value ? payrollForm.get('grossSalary')?.value : this.oldData.grossSalary
      //       };
      //       this._salary.editSalary(this.data.employeeId._id, payrollObj).subscribe({
      //       next:(res: any) => {
      //         this._dialogRef.close(true);
      //         // this.toastr.success("Data Updated Successfully");
      //       },
      //       error:  (error: any) => {
      //         console.log(this.data.employeeId._id)
      //         // this.toastr.error(error.error.message);
      //       }
      //       })
      //    }
      //   }
      //   }
       deleteVacation(id:number){
       this._vacation.deleteVacationById(id).subscribe((res:any)=>{
         this.getAllEmployeeVacations();
       })
       }

      onPageChanged(event: PageEvent) {
        const newPageIndex = event.pageIndex;
        const newPageSize = event.pageSize;
        if (newPageIndex !== this.currentPageIndex || newPageSize !== this.pageSize) {
          this.currentPageIndex = newPageIndex;
          this.pageSize = newPageSize;
          this._vacation.getAllEmployeeVacations(this.currentPageIndex, this.pageSize).subscribe((result) => {
            this.vacations=result.vacations;
            this.totalCount = result.vacations.totalCount;
            this.dataSource = new MatTableDataSource(this.vacations);
            this.dataSource.paginator = this.paginator;
          });
        }
      }
      
      onPreviousPage() {
        if (this.currentPageIndex > 1) {
          this.currentPageIndex--;
          this._vacation.getAllEmployeeVacations(this.currentPageIndex, 10).subscribe((result) => {
            this.vacations = result.vacations;
            this.totalCount = result.vacations;
            this.dataSource = new MatTableDataSource(this.vacations);
            this.dataSource.paginator = this.paginator;
          });
        }
      }
      
      onNextPage() {
        if (this.currentPageIndex < this.totalPages) {
          this.currentPageIndex++;
          this._vacation.getAllEmployeeVacations(this.currentPageIndex, 10).subscribe((result) => {
            this.vacations = result.vacations;
            this.totalCount = result.vacations.totalCount;
            this.dataSource = new MatTableDataSource(this.vacations);
            this.dataSource.paginator = this.paginator;
          });
        }
      }
      
}
