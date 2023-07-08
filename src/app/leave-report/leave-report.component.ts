import {AfterViewInit, Component,OnInit,ViewChild} from '@angular/core';
import { MatPaginator,PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LeaveReportService } from '../service/leave-report.service';
@Component({
  selector: 'app-leave-report',
  templateUrl: './leave-report.component.html',
  styleUrls: ['./leave-report.component.css']
})
export class LeaveReportComponent implements OnInit , AfterViewInit{

  report: any[] = [];
  displayedColumns: string[] = ['id','userrName', 'position','day','reason', 'respond',  'noOfExcuses'];
  loading: boolean = true;

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  totalCount!: number;
  pageSize = 10;
  currentPageIndex = 1;
  totalPages!: number;


constructor(private _report:LeaveReportService){

}

getAllHistory(){
  this._report.getLeaveReport(this.currentPageIndex, 10).subscribe((res:any)=>{
    this.report = res.data.docs;
    this.dataSource.data = res.data.docs;
    this.totalCount = res.data.totalDocs;
    this.totalPages = res.data.totalPages;
    this.dataSource.paginator = this.paginator;
    this.loading=false;
  })
}

ngOnInit(): void {
  this.getAllHistory();
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
      this._report.getLeaveReport(this.currentPageIndex, this.pageSize).subscribe((result : any) => {
        this.report=result.data.docs;
        this.totalCount = result.data.totalDocs;
        this.dataSource = new MatTableDataSource(this.report);
        this.dataSource.paginator = this.paginator;
      });
    }
  }
  
  onPreviousPage() {
    if (this.currentPageIndex > 1) {
      this.currentPageIndex--;
      this._report.getLeaveReport(this.currentPageIndex, 10).subscribe((result:any) => {
        this.report = result.data.docs;
        this.totalCount = result.data.totalDocs;
        this.dataSource = new MatTableDataSource(this.report);
        this.dataSource.paginator = this.paginator;
      });
    }
  }
  
  onNextPage() {
    if (this.currentPageIndex < this.totalPages) {
      this.currentPageIndex++;
      this._report.getLeaveReport(this.currentPageIndex, 10).subscribe((result:any) => {
        this.report = result.data.docs;
        this.totalCount = result.data.totalDocs;
        this.dataSource = new MatTableDataSource(this.report);
        this.dataSource.paginator = this.paginator;
      });
    }
  }

}
