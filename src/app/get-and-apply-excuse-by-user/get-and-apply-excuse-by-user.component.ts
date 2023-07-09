import {AfterViewInit, Component,OnInit,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconButton } from '@angular/material/button';
import { EcxusesService } from '../service/ecxuses.service';
import { Excuse } from '../excuse';
import { DatePipe } from '@angular/common';
import { GetAndApplyExcuseByUserDialogComponent } from '../get-and-apply-excuse-by-user-dialog/get-and-apply-excuse-by-user-dialog.component';
@Component({
  selector: 'app-get-and-apply-excuse-by-user',
  templateUrl: './get-and-apply-excuse-by-user.component.html',
  styleUrls: ['./get-and-apply-excuse-by-user.component.css']
})
export class GetAndApplyExcuseByUserComponent {
  loading: boolean = true;
  data!: any;
  totalCount!:number
  pageSize:number=10;
  ngOnInit(): void {
    this.getMyExcuses();
      }
      constructor(private _excuse:EcxusesService, private _dialog:MatDialog){}
      excuses:Excuse[]=[]
      currentPageIndex:number=0
      totalPages!:number


      displayedColumns: string[] = [ 'reason','Day','from','to','respond','typeOfExcuse','action'];
         dataSource = new MatTableDataSource<Excuse>();
         @ViewChild(MatPaginator) paginator!: MatPaginator


         getMyExcuses(){
          this._excuse.getMyExcuses(this.currentPageIndex, this.pageSize).subscribe((res:any)=>{
         //  this.vacations=res.allVacations;
          this.totalCount=res.paginationInfo.totalCount
          this.totalPages=res.paginationInfo.totalPages

         //  this.dataSource=new MatTableDataSource(this.vacations);

          this.dataSource.data = res.myExcuses;
          console.log(res);
         //  console.log("res.allVacations",res.allCasualVacations[0].employeeId.firstName);
          this.dataSource.paginator=this.paginator;
          this.loading=false;
          })
        }

        openEditDialog(data:any){
          const dialogRef= this._dialog.open(GetAndApplyExcuseByUserDialogComponent,{
          data,
          });
          dialogRef.afterClosed().subscribe({
            next:(val)=>{
             if(val){
              this.getMyExcuses();
             }
            }
          })
         
         }
  
       openDialog(){
        const dialogRef= this._dialog.open(GetAndApplyExcuseByUserDialogComponent);
        dialogRef.afterClosed().subscribe({
         next:(res:any)=>{
         if(res){
           this.getMyExcuses();
         }
         }
       })
       }
        onPageChanged(event: PageEvent) {
          const newPageIndex = event.pageIndex;
          const newPageSize = event.pageSize;
          if (newPageIndex !== this.currentPageIndex || newPageSize !== this.pageSize) {
            this.currentPageIndex = newPageIndex;
            this.pageSize = newPageSize;
            this._excuse.getMyExcuses(this.currentPageIndex, this.pageSize).subscribe((result) => {
              this.excuses=result.MyExcuses;
              this.totalCount = result.paginationInfo.totalCount;
              this.dataSource = new MatTableDataSource(this.excuses);
              this.dataSource.paginator = this.paginator;
            });
          }
          
        }
        
        onPreviousPage() {
          if (this.currentPageIndex > 0) {
            this.currentPageIndex--;
            this._excuse.getMyExcuses(this.currentPageIndex, 10).subscribe((result) => {
              this.excuses = result.MyExcuses;
              this.totalCount = result.totalCount;
              this.dataSource = new MatTableDataSource(this.excuses);
              this.dataSource.paginator = this.paginator;
            });
          }
        }
        
        onNextPage() {
          if (this.currentPageIndex < this.totalPages) {
            this.currentPageIndex++;
            this._excuse.getAllExcuses(this.currentPageIndex, 10).subscribe((result) => {
              this.excuses = result.MyExcuses;
              this.totalCount = result.paginationInfo.totalCount;
              this.dataSource = new MatTableDataSource(this.excuses);
              this.dataSource.paginator = this.paginator;
            });
            // console.log("this.totalCount ",this.totalCount );
  
          }
        }
        
}
