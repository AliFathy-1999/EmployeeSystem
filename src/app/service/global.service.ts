import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  // currentUser = new BehaviorSubject(null);
  public api_url = 'https://employee-xpert.onrender.com'
  public local_url = 'http://localhost:4000'

  token: string | null = this.getToken();

  constructor(private http: HttpClient,  private _cookieService: CookieService, private _router: Router){
  if(this._cookieService.check('token')){
  this.saveCurrentUser()
}
  }
currentUser = new BehaviorSubject<any>(null);
saveCurrentUser(){
const userToken= this._cookieService.get('token');
this.currentUser.next(jwtDecode(userToken))
}

getUserRole(): string {
const user = JSON.parse(localStorage.getItem('user') || '{}');
return user.role;
}

isLogged(): boolean {
return this._cookieService.get('token') != null;
}

isLogOut(): void {
  this._cookieService.delete('token');
  this._router.navigate(['']);
}

countDep():Observable<any>{
  return this.http.get(`${this.local_url}/dep/count/all`);
}

countEmp():Observable<any>{
  return this.http.get(`${this.local_url}/count/all`);
}

getToken(): string | null {
 return this._cookieService.get('token') || null;
}



  // saveCurrentUser() {
  //   let token: any = localStorage.getItem('userToken');
  //   this.currentUser.next(jwtDecode(token));
  // }
  // getToken(){
  //   return sessionStorage.getItem('token');
  // }
  
  signIn(obj:any): Observable<any>{
    return this.http.post(`${this.api_url}/signin`,obj);
  }
  addEmployee(obj:any) {
    return this.http.post(`${this.api_url}/admin-emp`,obj);
  }
  getAllDepartment(page:number,limit:number) {
    return this.http.get(`${this.api_url}/admin-dep?page=${page}&limit=${limit}`);
  }
  getSelectedDepartment() {
    return this.http.get(`${this.api_url}/admin-dep/selected-dep`);
  }
  getEmployees(role:string="USER",page:number,limit:number) {
    return this.http.get<any[]>(`${this.api_url}/admin-emp?role=${role}&page=${page}&limit=${limit}`);
  }
  updateEmployee(id: any, employee: any): Observable<any> {
    return this.http.put(`${this.api_url}/admin-emp/${id}`, employee);
  }
  deleteEmployee(id: any): Observable<any> {
    return this.http.delete(`${this.api_url}/admin-emp/${id}`);
  }
  getEmployeeDetails(id:any): Observable<any> {
    return this.http.get<any[]>(`${this.api_url}/${id}`);
  }
}

