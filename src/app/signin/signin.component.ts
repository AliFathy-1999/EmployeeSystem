import { HttpErrorResponse } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../service/global.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{
  formData:FormGroup ;
  errorMessage!: string;
  showPassword:boolean=false;
  ngOnInit(): void {
  
  }
  constructor(private formBuilder: FormBuilder,private _global:GlobalService,private toastr:ToastrService,private _cookieService:CookieService,private router:Router,private snackBar: MatSnackBar
    ) {
    this.formData = new FormGroup({
      userName:new FormControl('' , [Validators.required]),
      password:new FormControl('' , [Validators.required])
  });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(){
    this._global.signIn(this.formData.value).subscribe({next:(res:any) =>{
      this.snackBar.open('Logined successfully','', {
        duration: 1000,
      });
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
      if(HttpErrorResponse.error.message){
        this.errorMessage="Check Your Username or Password"
        this.snackBar.open(this.errorMessage,'', {
          duration: 1000,
        })
      }
    }
    })
  }
}
