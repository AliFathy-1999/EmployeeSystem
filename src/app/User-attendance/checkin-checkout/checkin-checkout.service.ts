import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CheckinCheckoutService {
  private baseUrl = 'http://127.0.0.1:4000/attendance'; // Change the URL to match your backend API endpoint

  constructor(private http: HttpClient) { }

  checkIn(employeeId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/checkin/`, {"employee": employeeId });
  }

  checkOut(employeeId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/checkout/`, {"employee": employeeId });
  }
}

