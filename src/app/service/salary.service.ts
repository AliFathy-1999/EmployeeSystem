import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  ROOT_URL: string = 'https://employee-xpert.onrender.com/';
  constructor(private _HttpClient: HttpClient) { 
  }

getAllSalary(page: number, limit: number): Observable<any> {
  return this._HttpClient.get(`${this.ROOT_URL}salary/all?page=${page}&limit=${limit}`);
}

deleteEmployeeSalaryById(id: number): Observable<any> {
  
  return this._HttpClient.delete(`${this.ROOT_URL}salary/${id}`);

}

editSalary(id: number, data: object) :Observable<any>{
  return this._HttpClient.patch(`${this.ROOT_URL}salary/${id}`, data);
}

getEmployeeSalary(): Observable<any>{
  return this._HttpClient.get(`${this.ROOT_URL}employee/salary/`);
}


}
