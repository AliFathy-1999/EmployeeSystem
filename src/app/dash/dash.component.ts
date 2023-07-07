import { Component, inject, OnInit} from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { GlobalService } from '../service/global.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit{
  // private breakpointObserver = inject(BreakpointObserver);

constructor(private _global:GlobalService){

}
emp!:any;
dep!:any;
data !:any;

ngOnInit(): void {
  this.countDep();
  this.countEmp();
}
  /** Based on the screen size, switch from standard to one column per row */
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         { title: 'Card 1', cols: 2, rows: 1, image: '../../assets/img/dashboard.jpeg' },
  //         { title: 'Card 2', cols: 1, rows: 1, image: '..\src\assets\img\dashboard2.jpeg' },
  //         { title: 'Card 3', cols: 1, rows: 2, image: '..\src\assets\img\dashboard.jpeg' },
  //         { title: 'Card 4', cols: 1, rows: 1, image: '..\src\assets\img\Dashboard.jpeg' }
  //       ];
  //     }

  //     return [
  //       { title: 'Card 1', cols: 2, rows: 1, image: '..\src\assets\img\dashboard3.jpeg' },
  //       { title: 'Card 2', cols: 1, rows: 1, image: '..\src\assets\img\dashboard2.jpeg' },
  //       { title: 'Card 3', cols: 1, rows: 2, image: '..\src\assets\img\dashboard.jpeg' },
  //       { title: 'Card 4', cols: 1, rows: 1, image: '..\src\assets\img\Dashboard.jpeg' }
  //     ];
  //   })
  // );

  countDep(){
   this._global.countDep().subscribe((res)=>{
    this.dep = res.data;

  })
  }

  countEmp(){
    this._global.countEmp().subscribe((res)=>{
      this.emp = res.data;
    })
  }
}
