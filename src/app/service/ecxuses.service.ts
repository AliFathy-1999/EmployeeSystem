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


  updateVacationByAdmin(id:number,data:any): Observable<any> {
    return this._http.patch(`${this.api_url}/excuse/admin/${id}`,data);

  }
}
