import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PayrolllHistoryService {

  ROOT_URL: string = 'https://employee-xpert.onrender.com/';
  public local_url = 'http://localhost:4000/'

  constructor(private _HttpClient: HttpClient) { 
  }

getAllPayrollHistory(page: number, limit: number): Observable<any> {
  return this._HttpClient.get(`${this.local_url}pHistory/all?page=${page}&limit=${limit}`);
}
}
