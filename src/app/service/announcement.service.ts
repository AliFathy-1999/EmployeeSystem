import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {
  ROOT_URL: string = 'https://employee-xpert.onrender.com';
  Data :any =''
  constructor(private _http: HttpClient) {
   
   }

  getAnnouncements(){
    
    return this._http.get(`${this.ROOT_URL }`+'/communications/allAnouncements?pages=1&limit=100')

  }

  getLastAnnouncement(){
    
    return this._http.get(`${this.ROOT_URL }`+'/communications/lastAnouncement')

  }

  sendAnnouncement(data:any){
    return this._http.post(`${this.ROOT_URL }`+'/communications/toall',data)
  }

}
