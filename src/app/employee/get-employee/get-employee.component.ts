import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/service/global.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { faEye,faSquarePen,faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-get-employee',
  templateUrl: './get-employee.component.html',
  styleUrls: ['./get-employee.component.css']
})
export class GetEmployeeComponent implements OnInit {
  faEye = faEye;faSquarePen=faSquarePen;faTrash=faTrash
  hasNextPage:Boolean=false
  employees: any;
  pagedEmployees: any[] = [];
  limit: number = 10;
  page: number = 0;
  totalItems: any;
  totalPages!: number;
  role:string = 'USER';
  paginationData: any = {};
  loading: boolean = true;
  endTime = performance.now();
  constructor(private globalService: GlobalService,
    public toastr:ToastrService,
    private router:Router) { }

  ngOnInit() {
    this.fetchData(1)
  }
  fetchData(page:number){
    const startTime = performance.now();
    const duration = this.endTime - startTime;
    setTimeout(() => {
      this.globalService.getEmployees(this.role ,page,10).subscribe((data:any) => {
          this.employees = data.data.docs;
          this.totalItems = data.data.totalDocs;
          this.hasNextPage = data.data.hasNextPage;
          this.totalPages = data.data.totalPages;
          this.loading = false;
      })
  },duration)
  }
  prevPage() {
    this.fetchData(this.page -= 1)
  }
  nextPage(){
    this.fetchData(this.page += 1)
  }
  deleteEmployee(empId:any){
    this.globalService.deleteEmployee(empId).subscribe(data => {
      this.toastr.success(`Employee with id : ${empId} deleted successfully`)
      this.ngOnInit()
    },(err)=>{
      this.toastr.success(`Failed to Delete Employee with id : ${empId}`)
    })
  }
  gotoUpdateEmp(id:any){
    this.router.navigate(['/updateEmployee/' + id]);
  }
  gotoEmpDetails(id:any){
    this.router.navigate(['/employeeDetails/' + id]);
  }
}
