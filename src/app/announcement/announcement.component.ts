import { Component } from '@angular/core';
import { AnnouncementService } from '../service/announcement.service';
import { DatePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import{
FormBuilder,
FormGroup,
Validators,
FormControl,
FormsModule,
ReactiveFormsModule,
} from '@angular/forms';
import { GlobalService } from '../service/global.service';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent {
    allAnnouncements :any = []
    currentUser     :any ;
    newAnnouncement!: FormGroup;
   
constructor(private _announcements:AnnouncementService,private formBuilder: FormBuilder,
  private _user:GlobalService){ 

  this.currentUser = this._user.currentUser.getValue();
  this.getAllAnouncements()
  

}

  getAllAnouncements(){
    this._announcements.getAnnouncements().subscribe((res:any)=>{

      this.allAnnouncements = res.data.reverse()

    },(err:any)=>{
      console.log(err)
    })
  }

  sendNewAnnouncement(){
    
    console.log(this.newAnnouncement.value.newMessage)
  this._announcements.sendAnnouncement(
      {"message":this.newAnnouncement.value.newMessage,"title":this.newAnnouncement.value.title,"isForAll":true}).subscribe(
        (res:any)=>{
          console.log(res)
          this.getAllAnouncements()
          
      },(err:any)=>{
         console.log(err)
      })

      this.newAnnouncement.setValue({
        newMessage: '',
        title: ''
      });
  }

  ngOnInit() {
    if (this.currentUser.role == 'ADMIN') {
      this.newAnnouncement = this.formBuilder.group({
        newMessage: [
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(300),
            this.notOnlyWhitespace,
          ]),
        ],
        title: [
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(300),
            this.notOnlyWhitespace,
          ]),
        ]
      });
    }
   
  }

  notOnlyWhitespace(control: FormControl): { [key: string]: boolean } | null {
    if (control.value && control.value.trim().length === 0) {
      return { notOnlyWhitespace: true };
    }
    return null;
  }

  calculateTime(time:any){
   
const timestamp = new Date(time).getTime(); 
const now = Date.now(); 
const diff = now - timestamp;
const days = Math.floor(diff/ (1000 * 60 * 60 * 24));
if(days<=0) return "Today  "

if(days==1) return "DAY AGO  "

return `${days} DAYS AGO  `

}}
