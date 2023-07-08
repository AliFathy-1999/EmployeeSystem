import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  api_url = 'https://employee-xpert.onrender.com'
  public local_url = 'http://localhost:4000'
  constructor(private http: HttpClient) { }
  getAllDepartments(){
    return this.http.get<any[]>(`${this.api_url}/admin-dep`);
  }
  getDepartmentDetails(id:any){
    return this.http.get<any[]>(`${this.api_url}/dep/emp/${id}`);
  }
  deleteDepartment(id: any): Observable<any> {
    return this.http.delete(`${this.api_url}/admin-dep/${id}`);
  }
  getSelectedEmployees() {
    return this.http.get(`${this.api_url}/admin-emp/getselected`);
  }
  addDepartment(obj:any) {
    return this.http.post(`${this.api_url}/admin-dep`,obj);
  }
}
