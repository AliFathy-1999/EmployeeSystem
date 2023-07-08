import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CasualVacationsService {
  public api_url = 'https://employee-xpert.onrender.com'
  public local_url = 'http://localhost:4000'
  constructor(private _http: HttpClient) { }

  
  getAllCasualVacations(page: number, limit: number): Observable<any> {
    // const options = { withCredentials: true};
    // console.log(limit);
    return this._http.get(`${this.api_url}/casVacations/all?page=${page}&limit=${limit}`);
  }

  getMyCasualVacations(page: number, limit: number): Observable<any> {
    // const options = { withCredentials: true};
    // console.log(limit);
    return this._http.get(`${this.api_url}/casVacations/myCasualVacations?page=${page}&limit=${limit}`);
  }

  addCasualVacation(data:any): Observable<any>{
    return this._http.post(`${this.api_url}/casVacations/apply`, data);

  }
}
