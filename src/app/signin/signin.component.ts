import { HttpErrorResponse } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../service/global.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{
  formData:FormGroup ;
  errorMessage!: string;

  ngOnInit(): void {
  
  }
  constructor(private formBuilder: FormBuilder,private _global:GlobalService,private toastr:ToastrService,private _cookieService:CookieService,private router:Router) {
    this.formData = new FormGroup({
      userName:new FormControl('' , [Validators.required]),
      password:new FormControl('' , [Validators.required])
  });
  }

  onSubmit(){
    this._global.signIn(this.formData.value).subscribe({next:(res:any) =>{
      this.toastr.success("Signin successfully")
      this._cookieService.delete('token');
      this._cookieService.set('token', res.data.token);
      this._global.saveCurrentUser();
      const user=this._global.currentUser.getValue();
      if(user.role == 'USER'){
        this.router.navigate(['/me'])
      }else{
        this.router.navigate(['/dashboard/'])
      }
    },error: (HttpErrorResponse) => {
      if(HttpErrorResponse.error.message==="un-authenticated"){
        this.errorMessage="Check Your Username or Password"
        this.toastr.error(this.errorMessage)
      }
    }
    })
  }
}
