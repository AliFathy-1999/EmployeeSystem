import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance } from './employee-attendance.model';


@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'http://127.0.0.1:4000/attendance'; // Replace this with your backend API URL

  constructor(private http: HttpClient) { }

  // Define your API endpoints here
  all(page: number = 1, limit: number = 10): Observable<any> {
    const url = `${this.apiUrl}/all/?page=${page}&limit=${limit}`;
    return this.http.get<any>(url);
  }
}

