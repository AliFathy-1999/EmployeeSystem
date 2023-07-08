import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  ROOT_URL: string = 'https://employee-xpert.onrender.com/';
  public local_url = 'http://localhost:4000/'

  constructor(private _HttpClient: HttpClient) { 
  }

getAllHoliday(page: number, limit: number): Observable<any> {
  return this._HttpClient.get(`${this.local_url}holiday/all?page=${page}&limit=${limit}`);
}

deleteHolidayyById(id: number): Observable<any> { 
  return this._HttpClient.delete(`${this.local_url}holiday/${id}`);
}

editHoliday(id: number, data: object) :Observable<any>{
  return this._HttpClient.put(`${this.local_url}holiday/${id}`, data);
}

createHoliday(data: object):Observable<any>{
  return this._HttpClient.post(`${this.local_url}holiday/`, data);

}

}
