import { Component, ViewChild,OnInit, TemplateRef } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TableDataSource, TableItem } from './table-datasource';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { faEye,faSquarePen,faTrash } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/service/department.service';
@Component({
  selector: 'app-get-departments',
  templateUrl: './get-departments.component.html',
  styleUrls: ['./get-departments.component.css']
})
export class GetDepartmentsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableItem>;
  @ViewChild('loadingIndicator') loadingIndicator!: TemplateRef<any>;
  dataSource: MatTableDataSource<any>;
  filterValue: string ='';
  isLoading: boolean = false;
  faEye = faEye;faSquarePen=faSquarePen;faTrash=faTrash
  value = 'Clear me';

  displayedColumns = ['_id', 'name', 'description'];



  constructor(private http: HttpClient,private _global:DepartmentService,
    private router:Router,private toastr:ToastrService) {
    this.dataSource = new MatTableDataSource<any>();
   }

  ngOnInit() {
    this.getDepartments();

  }
  getDepartments(){
    let limit = 10;
    let skip = 1;

    this._global.getAllDepartments().subscribe((data:any) => {
    limit = data.data.totalDocs
    this.dataSource = new MatTableDataSource<any>(data.data.docs);
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

    this.http.get<any[]>('https://employee-xpert.onrender.com/admin-dep/', { params })
      .subscribe((data: any) => {
        this.dataSource.data = data.data.docs;
        this.isLoading = false;
      });
  }
  gotoUpdateDep(id:any){
    this.router.navigate(['/updateDepartment/' + id]);
  }
  gotoDepDetails(id:any){
    this.router.navigate(['/departmentDetails/' + id]);
  }
  deleteDepartment(depId:any){
    this._global.deleteDepartment(depId).subscribe((data:any) => {
      this.toastr.success(`Department with id : ${depId} deleted successfully`)
      this.ngOnInit()
    },(err:any)=>{
      this.toastr.success(`Failed to Delete Department with id : ${depId}`)
    })
  }
}
