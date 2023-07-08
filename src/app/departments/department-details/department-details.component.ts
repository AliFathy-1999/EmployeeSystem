import { Component, ViewChild,OnInit, TemplateRef } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableDataSource, TableItem } from './table-datasource';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { faEye,faSquarePen,faTrash } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/service/department.service';
@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableItem>;
  @ViewChild('loadingIndicator') loadingIndicator!: TemplateRef<any>;
  dataSource: MatTableDataSource<any>;
  filterValue: string ='';
  isLoading: boolean = false;
  faEye = faEye;faSquarePen=faSquarePen;faTrash=faTrash
  value = 'Clear me';
  depId:any
  displayedColumns = ['_id', 'firstName', 'lastName','userName','email','position','jobType','phoneNumber','actions'];
  departmentData={
    name:'',
    description:'',
  };
  constructor(private http: HttpClient,private _global:DepartmentService,
    private router:Router,private toastr:ToastrService,private route:ActivatedRoute) {
    this.dataSource = new MatTableDataSource<any>();
    this.depId = this.route.snapshot.params['id'];

   }

  ngOnInit() {
    this.getDepEmployees();
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return (
        data.firstName.toLowerCase().includes(filter.toLowerCase()) ||
        data.userName.toLowerCase().includes(filter.toLowerCase())
      );
    };
  }
  getDepEmployees(){
    let limit = 10;
    let skip = 1;

    this._global.getDepartmentDetails(this.depId).subscribe((data:any) => {
      this.departmentData = data.data[0]
    limit = data.data[1].totalDocs


    this.dataSource = new MatTableDataSource<any>(data.data[1].docs);
      this.dataSource.paginator = this.paginator;

      this.paginator.page.subscribe(() => {
        skip = (this.paginator.pageIndex - 1) * this.paginator.pageSize;
        this.getDataWithLimitAndSkip(limit, skip);
      });

      this.getDataWithLimitAndSkip(limit, skip);
    });
  }
  applyFilter() {
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }
  getDataWithLimitAndSkip(limit: number, skip: number) {
    this.isLoading = true;
    let params = new HttpParams();
    params = params.append('limit', limit.toString());
    params = params.append('skip', skip.toString());


    this.http.get<any[]>(`https://employee-xpert.onrender.com/dep/emp/${this.depId}`, { params })
      .subscribe((data: any) => {
        this.dataSource.data = data.data[1].docs;
        this.isLoading = false;
      });
  }


}

