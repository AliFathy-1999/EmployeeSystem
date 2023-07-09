import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VacationReportService {
  ROOT_URL: string = 'https://employee-xpert.onrender.com/';
  public local_url = 'http://localhost:4000/'

  constructor(private http: HttpClient) { 
  }

getVacationReport(page: number, limit: number): Observable<any> {
  return this.http.get(`${this.local_url}vReport/all?page=${page}&limit=${limit}`);

}
}
