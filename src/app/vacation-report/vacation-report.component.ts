import {AfterViewInit, Component,OnInit,ViewChild} from '@angular/core';
import { MatPaginator,PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { VacationReportService } from '../service/vacation-report.service';
@Component({
  selector: 'app-vacation-report',
  templateUrl: './vacation-report.component.html',
  styleUrls: ['./vacation-report.component.css']
})
export class VacationReportComponent {
  report: any[] = [];
  displayedColumns: string[] = ['id','userrName', 'reasonForVacation','fromDay','toDay', 'status',  'totalDays'];



  loading: boolean = true;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  totalCount!: number;
  pageSize = 10;
  currentPageIndex = 1;
  totalPages!: number;

  constructor(private _report:VacationReportService){}
  getVacationReport(){
    this._report.getVacationReport(this.currentPageIndex, 10).subscribe((res:any)=>{
      this.report = res.data.docs;
      this.dataSource.data = res.data.docs;
      this.totalCount = res.data.totalDocs;
      this.totalPages = res.data.totalPages;
      this.dataSource.paginator = this.paginator;
      console.log(res);
      
      this.loading=false;
    })
  }
  
  ngOnInit(): void {
    this.getVacationReport();
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
        this._report.getVacationReport(this.currentPageIndex, this.pageSize).subscribe((result : any) => {
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
        this._report.getVacationReport(this.currentPageIndex, 10).subscribe((result:any) => {
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
        this._report.getVacationReport(this.currentPageIndex, 10).subscribe((result:any) => {
          this.report = result.data.docs;
          this.totalCount = result.data.totalDocs;
          this.dataSource = new MatTableDataSource(this.report);
          this.dataSource.paginator = this.paginator;
        });
      }
    }
  
}
