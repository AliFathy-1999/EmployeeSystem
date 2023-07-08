import {AfterViewInit, Component,OnInit,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconButton } from '@angular/material/button';
import { casualVacations } from '../casualVacations';
import { CasualVacationsService } from '../service/casual-vacations.service';
import { CasualVacationsComponent } from '../casual-vacations/casual-vacations.component';
@Component({
  selector: 'app-get-my-casual-vacations',
  templateUrl: './get-my-casual-vacations.component.html',
  styleUrls: ['./get-my-casual-vacations.component.css']
})
export class GetMyCasualVacationsComponent {
  loading: boolean = true;
  data!: any;
  totalCount!:number
  pageSize:number=10;
  ngOnInit(): void {
    this.getMyCasualVacations();
      }
      constructor(private _casualvacation:CasualVacationsService, private _dialog:MatDialog){}
      casualVacations:casualVacations[]=[]
      currentPageIndex:number=0
      totalPages!:number
      
      openDialog(){
        const dialogRef= this._dialog.open(CasualVacationsComponent);
        dialogRef.afterClosed().subscribe({
         next:(res:any)=>{
         if(res){
           this.getMyCasualVacations();
         }
         }
       })
       }

      //  openEditDialog(data:any){
      //   const dialogRef= this._dialog.open(VacationDialogComponent,{
      //   data,
      //   });
      //   dialogRef.afterClosed().subscribe({
      //     next:(val)=>{
      //      if(val){
      //       this.getAllVacations();
      //      }
      //     }
      //   })
       
      //  }

       
 displayedColumns: string[] = [ 'reasonForVacation','Day','totalCasDays','casualVacation'];
         dataSource = new MatTableDataSource<casualVacations>();
         @ViewChild(MatPaginator) paginator!: MatPaginator;
       
         ngAfterViewInit() {
           this.dataSource.paginator = this.paginator;
         }
       
         getMyCasualVacations(){
         this._casualvacation.getMyCasualVacations(this.currentPageIndex, this.pageSize).subscribe((res:any)=>{
        //  this.vacations=res.allVacations;
         this.totalCount=res.paginationInfo.totalCount
         this.totalPages=res.paginationInfo.totalPages
        //  this.dataSource=new MatTableDataSource(this.vacations);
         this.dataSource.data = res.myCasualVacations;
         console.log(res);
         this.dataSource.paginator=this.paginator;
         this.loading=false;
         })
       }
       


      onPageChanged(event: PageEvent) {
        const newPageIndex = event.pageIndex;
        const newPageSize = event.pageSize;
        if (newPageIndex !== this.currentPageIndex || newPageSize !== this.pageSize) {
          this.currentPageIndex = newPageIndex;
          this.pageSize = newPageSize;
          this._casualvacation.getMyCasualVacations(this.currentPageIndex, this.pageSize).subscribe((result) => {
            this.casualVacations=result.myCasualVacations;
            this.totalCount = result.paginationInfo.totalCount;
            this.dataSource = new MatTableDataSource(this.casualVacations);
            this.dataSource.paginator = this.paginator;
          });
        }
        
      }
      
      onPreviousPage() {
        if (this.currentPageIndex > 0) {
          this.currentPageIndex--;
          this._casualvacation.getMyCasualVacations(this.currentPageIndex, 10).subscribe((result) => {
            this.casualVacations = result.allCasualVacations;
            this.totalCount = result.totalCount;
            this.dataSource = new MatTableDataSource(this.casualVacations);
            this.dataSource.paginator = this.paginator;
          });
        }
      }
      
      onNextPage() {
        if (this.currentPageIndex < this.totalPages) {
          this.currentPageIndex++;
          this._casualvacation.getMyCasualVacations(this.currentPageIndex, 10).subscribe((result) => {
            this.casualVacations = result.allCasualVacations;
            this.totalCount = result.paginationInfo.totalCount;
            this.dataSource = new MatTableDataSource(this.casualVacations);
            this.dataSource.paginator = this.paginator;
          });
          console.log("this.totalCount ",this.totalCount );

        }
      }
}
