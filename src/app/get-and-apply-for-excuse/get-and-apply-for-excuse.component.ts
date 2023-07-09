import {AfterViewInit, Component,OnInit,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconButton } from '@angular/material/button';
import { EcxusesService } from '../service/ecxuses.service';
import { Excuse } from '../excuse';
import { DatePipe } from '@angular/common';
import { GetAndApplyForExcuseDialogComponent } from '../get-and-apply-for-excuse-dialog/get-and-apply-for-excuse-dialog.component';
@Component({
  selector: 'app-get-and-apply-for-excuse',
  templateUrl: './get-and-apply-for-excuse.component.html',
  styleUrls: ['./get-and-apply-for-excuse.component.css']
})
export class GetAndApplyForExcuseComponent implements OnInit {
  loading: boolean = true;
  data!: any;
  totalCount!:number
  pageSize:number=10;
  ngOnInit(): void {
    this.getAllExcuses();
      }
      constructor(private _excuse:EcxusesService, private _dialog:MatDialog){}
      excuses:Excuse[]=[]
      currentPageIndex:number=0
      totalPages!:number


      displayedColumns: string[] = ["employeeId", 'reason','Day','from','to','respond','typeOfExcuse','action'];
         dataSource = new MatTableDataSource<Excuse>();
         @ViewChild(MatPaginator) paginator!: MatPaginator;
       
         ngAfterViewInit() {
           this.dataSource.paginator = this.paginator;
         }
       
         getAllExcuses(){
         this._excuse.getAllExcuses(this.currentPageIndex, this.pageSize).subscribe((res:any)=>{
        //  this.vacations=res.allVacations;
         this.totalCount=res.data.paginationInfo.totalCount
         this.totalPages=res.data.paginationInfo.totalPages
        //  this.dataSource=new MatTableDataSource(this.vacations);
         this.dataSource.data = res.data.allExcuses;
         console.log(res.data);
        //  console.log("res.allVacations",res.allCasualVacations[0].employeeId.firstName);
         this.dataSource.paginator=this.paginator;
         this.loading=false;
         })
       }

       openEditDialog(data:any){
        const dialogRef= this._dialog.open(GetAndApplyForExcuseDialogComponent,{
        data,
        });
        dialogRef.afterClosed().subscribe({
          next:(val)=>{
           if(val){
            this.getAllExcuses();
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
          this._excuse.getAllExcuses(this.currentPageIndex, this.pageSize).subscribe((result) => {
            this.excuses=result.data.allExcuses;
            this.totalCount = result.data.paginationInfo.totalCount;
            this.dataSource = new MatTableDataSource(this.excuses);
            this.dataSource.paginator = this.paginator;
          });
        }
        
      }
      
      onPreviousPage() {
        if (this.currentPageIndex > 0) {
          this.currentPageIndex--;
          this._excuse.getAllExcuses(this.currentPageIndex, 10).subscribe((result) => {
            this.excuses = result.data.allExcuses;
            this.totalCount = result.data.totalCount;
            this.dataSource = new MatTableDataSource(this.excuses);
            this.dataSource.paginator = this.paginator;
          });
        }
      }
      
      onNextPage() {
        if (this.currentPageIndex < this.totalPages) {
          this.currentPageIndex++;
          this._excuse.getAllExcuses(this.currentPageIndex, 10).subscribe((result) => {
            this.excuses = result.data.allExcuses;
            this.totalCount = result.data.paginationInfo.totalCount;
            this.dataSource = new MatTableDataSource(this.excuses);
            this.dataSource.paginator = this.paginator;
          });
          // console.log("this.totalCount ",this.totalCount );

        }
      }
      
      
}
