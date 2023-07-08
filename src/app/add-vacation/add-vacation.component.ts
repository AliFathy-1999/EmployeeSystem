import {AfterViewInit, Component,OnInit,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconButton } from '@angular/material/button';
import { VocationServiceService } from '../service/vocation-service.service';
import { VacationDialogComponent } from '../vacation-dialog/vacation-dialog.component';
import {Vacation} from '../vacation';
@Component({
  selector: 'app-add-vacation',
  templateUrl: './add-vacation.component.html',
  styleUrls: ['./add-vacation.component.css']
})

export class AddVacationComponent implements OnInit {
  loading: boolean = true;
  data!: any;
  totalCount!:number
  pageSize:number=10;
  
  ngOnInit(): void {
    this.getAllVacations();
      }
      constructor(private _vacation:VocationServiceService, private _dialog:MatDialog){}
      vacations:Vacation[]=[]
      currentPageIndex:number=0
      totalPages!:number
      
      openDialog(){
        const dialogRef= this._dialog.open(VacationDialogComponent);
        dialogRef.afterClosed().subscribe({
         next:(res:any)=>{
         if(res){
           this.getAllVacations();
         }
         }
       })
       }

       openEditDialog(data:any){
        const dialogRef= this._dialog.open(VacationDialogComponent,{
        data,
        });
        dialogRef.afterClosed().subscribe({
          next:(val)=>{
           if(val){
            this.getAllVacations();
           }
          }
        })
       
       }

       
 displayedColumns: string[] = ['firstName', 'lastName', 'reasonForVacation','fromDay','toDay','status','action'];
         dataSource = new MatTableDataSource<Vacation>();
         @ViewChild(MatPaginator) paginator!: MatPaginator;
       
         ngAfterViewInit() {
           this.dataSource.paginator = this.paginator;
         }
       
        getAllVacations(){
         this._vacation.getAllVacations(this.currentPageIndex, this.pageSize).subscribe((res:any)=>{
        //  this.vacations=res.allVacations;
         this.totalCount=res.allVacations.totalCount
         this.totalPages=res.allVacations.totalPages
        //  this.dataSource=new MatTableDataSource(this.vacations);
         this.dataSource.data = res.allVacations;
         console.log(res.allVacations);
         console.log("res.allVacations",res.allVacations[0].employeeId.firstName);
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
          this._vacation.getAllVacations(this.currentPageIndex, this.pageSize).subscribe((result) => {
            this.vacations=result.allVacations;
            this.totalCount = result.allVacations.totalDocs;
            this.dataSource = new MatTableDataSource(this.vacations);
            this.dataSource.paginator = this.paginator;
          });
        }
        
      }
      
      onPreviousPage() {
        if (this.currentPageIndex > 1) {
          this.currentPageIndex--;
          this._vacation.getAllVacations(this.currentPageIndex, 10).subscribe((result) => {
            this.vacations = result.allVacations;
            this.totalCount = result.allVacations;
            this.dataSource = new MatTableDataSource(this.vacations);
            this.dataSource.paginator = this.paginator;
          });
        }
      }
      
      onNextPage() {
        if (this.currentPageIndex < this.totalPages) {
          this.currentPageIndex++;
          this._vacation.getAllVacations(this.currentPageIndex, 10).subscribe((result) => {
            this.vacations = result.allVacations;
            this.totalCount = result.allVacations.totalCount;
            this.dataSource = new MatTableDataSource(this.vacations);
            this.dataSource.paginator = this.paginator;
          });
          console.log("this.totalCount ",this.totalCount );

        }
      }
      
}
