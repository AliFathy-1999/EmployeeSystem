import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EcxusesService {
  public api_url = 'https://employee-xpert.onrender.com'
  public local_url = 'http://localhost:4000'
  constructor(private _http: HttpClient) { }
  getAllExcuses(page: number, limit: number): Observable<any> {
    // const options = { withCredentials: true};
    // console.log(limit);
    return this._http.get(`${this.api_url}/excuse/all?page=${page}&limit=${limit}`);
  }

  getMyExcuses(page: number, limit: number): Observable<any> {
    // const options = { withCredentials: true};
    // console.log(limit);
    return this._http.get(`${this.local_url}/excuse/myExcuses/all?page=${page}&limit=${limit}`);
  }
  updateVacationByAdmin(id:number,data:any): Observable<any> {
    return this._http.patch(`${this.api_url}/excuse/admin/${id}`,data);

  }

  addExcuseByUser(data:any): Observable<any> {
   
    // const options = { withCredentials: true};
    return this._http.post(`${this.local_url}/excuse`, data);

    // return this._http.post(`${this.api_url}/vacations/admin`, vacationData);
  }

  updateExcuseByUser(id:number,data:any): Observable<any> {
    return this._http.put(`${this.api_url}/excuse/${id}`,data);

  }
}
