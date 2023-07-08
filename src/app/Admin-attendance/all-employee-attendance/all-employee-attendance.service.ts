import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance } from './all-employee-attendance.model';


@Injectable({
  providedIn: 'root'
})
export class AllAttendanceService {
  private apiUrl = 'http://127.0.0.1:4000/attendance'; // Replace this with your backend API URL

  constructor(private http: HttpClient) { }

  // Define your API endpoints here
  getAllAttendances(page: number = 1, limit: number = 10): Observable<any> {
    const token = localStorage.getItem('userToken');
console.log(token)
    const headers = new HttpHeaders({
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const url = `http://localhost:4000/attendance/getAllAttendances?page=${page}&limit=${limit}`;
    return this.http.get<any>(url, { headers });
  }
}

