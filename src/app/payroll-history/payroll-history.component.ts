import {AfterViewInit, Component,OnInit,ViewChild} from '@angular/core';
import { MatPaginator,PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PayrolllHistoryService } from '../service/payrolll-history.service';

@Component({
  selector: 'app-payroll-history',
  templateUrl: './payroll-history.component.html',
  styleUrls: ['./payroll-history.component.css']
})
export class PayrollHistoryComponent implements OnInit , AfterViewInit{

  payroll: any[] = [];
  displayedColumns: string[] = ['id','userrName',  'position','grossSalary', 'bonus',  'deduction', 'netSalary'];
  loading: boolean = true;

  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  totalCount!: number;
  pageSize = 10;
  currentPageIndex = 1;
  totalPages!: number;


constructor(private _payroll:PayrolllHistoryService){

}

getAllHistory(){
  this._payroll.getAllPayrollHistory(this.currentPageIndex, 10).subscribe((res:any)=>{
    this.payroll = res.data.docs;
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
      this._payroll.getAllPayrollHistory(this.currentPageIndex, this.pageSize).subscribe((result : any) => {
        this.payroll=result.data.docs;
        this.totalCount = result.data.totalDocs;
        this.dataSource = new MatTableDataSource(this.payroll);
        this.dataSource.paginator = this.paginator;
      });
    }
  }
  
  onPreviousPage() {
    if (this.currentPageIndex > 1) {
      this.currentPageIndex--;
      this._payroll.getAllPayrollHistory(this.currentPageIndex, 10).subscribe((result:any) => {
        this.payroll = result.data.docs;
        this.totalCount = result.data.totalDocs;
        this.dataSource = new MatTableDataSource(this.payroll);
        this.dataSource.paginator = this.paginator;
      });
    }
  }
  
  onNextPage() {
    if (this.currentPageIndex < this.totalPages) {
      this.currentPageIndex++;
      this._payroll.getAllPayrollHistory(this.currentPageIndex, 10).subscribe((result:any) => {
        this.payroll = result.data.docs;
        this.totalCount = result.data.totalDocs;
        this.dataSource = new MatTableDataSource(this.payroll);
        this.dataSource.paginator = this.paginator;
      });
    }
  }

}
