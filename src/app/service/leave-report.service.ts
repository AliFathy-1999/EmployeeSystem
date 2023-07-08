import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LeaveReportService {

  ROOT_URL: string = 'https://employee-xpert.onrender.com/';
  public local_url = 'http://localhost:4000/'

  constructor(private _HttpClient: HttpClient) { 
  }

getLeaveReport(page: number, limit: number): Observable<any> {
  return this._HttpClient.get(`${this.local_url}leave/all?page=${page}&limit=${limit}`);

}
}
