import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmployeeMessagesService {
  ROOT_URL: string = 'https://employee-xpert.onrender.com';
  Data :any =''
  constructor(private _http: HttpClient, private _router: Router) {
   
   }

   getUserMessages(){

    return    this._http.get(`${this.ROOT_URL }`+'/communications/myMessage')
   }
   
   getUserLastMessage(){

    return    this._http.get(`${this.ROOT_URL }`+'/communications/myLastMessage')
   }
   getAdminMessages(EmpId:string){
    return  this._http.get(`${this.ROOT_URL }`+'/communications/EmpolyeeMessages/'+`${EmpId}`)
   }

   sendMessage(MessageData:string){
    return  this._http.post(`${this.ROOT_URL }`+'/communications/toemployee/',MessageData)
   }

   getEmpData(senderId:any){
    return  this._http.get(`${this.ROOT_URL }`+'/'+`${senderId}`)
   }



   getAllEmployees(){
    return  this._http.get(`${this.ROOT_URL }`+'/admin-emp/?role=USER&page=1&limit=100')
   }

}
