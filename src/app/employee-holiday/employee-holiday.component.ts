import {AfterViewInit, Component,OnInit,ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator,PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Toast, ToastrService } from 'ngx-toastr';
import { ServiceService } from '../holiday/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-holiday',
  templateUrl: './employee-holiday.component.html',
  styleUrls: ['./employee-holiday.component.css']
})
export class EmployeeHolidayComponent implements OnInit , AfterViewInit{

  holiday: any[] = [];
  displayedColumns: string[] = ['holidayName', 'holidayDate','noOfDays'];
  loading: boolean = true;

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  totalCount!: number;
  pageSize = 10;
  currentPageIndex = 1;
  totalPages!: number;


constructor(private _dialog:MatDialog, private _holiday: ServiceService,private toastr:ToastrService){

}

getAllHoliday(){
  this._holiday.getAllHoliday(this.currentPageIndex, 10).subscribe((res:any)=>{
    this.holiday = res.data.docs;
    this.dataSource.data = res.data.docs;
    this.totalCount = res.data.totalDocs;
    this.totalPages = res.data.totalPages;
    this.dataSource.paginator = this.paginator;
    this.loading=false;
  })
}

ngOnInit(): void {
  this.getAllHoliday();
}



ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
}



  onPageChanged(event: PageEvent) {
    const newPageIndex = event.pageIndex;
    const newPageSize = event.pageSize;
    if (newPageIndex !== this.currentPageIndex || newPageSize !== this.pageSize) {
      this.currentPageIndex = newPageIndex;
      this.pageSize = newPageSize;
      this._holiday.getAllHoliday(this.currentPageIndex, this.pageSize).subscribe((result : any) => {
        this.holiday=result.data.docs;
        this.totalCount = result.data.totalDocs;
        this.dataSource = new MatTableDataSource(this.holiday);
        this.dataSource.paginator = this.paginator;
      });
    }
  }
  
  onPreviousPage() {
    if (this.currentPageIndex > 1) {
      this.currentPageIndex--;
      this._holiday.getAllHoliday(this.currentPageIndex, 10).subscribe((result:any) => {
        this.holiday = result.data.docs;
        this.totalCount = result.data.totalDocs;
        this.dataSource = new MatTableDataSource(this.holiday);
        this.dataSource.paginator = this.paginator;
      });
    }
  }
  
  onNextPage() {
    if (this.currentPageIndex < this.totalPages) {
      this.currentPageIndex++;
      this._holiday.getAllHoliday(this.currentPageIndex, 10).subscribe((result:any) => {
        this.holiday = result.data.docs;
        this.totalCount = result.data.totalDocs;
        this.dataSource = new MatTableDataSource(this.holiday);
        this.dataSource.paginator = this.paginator;
      });
    }
  }

}
