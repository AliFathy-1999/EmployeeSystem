import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { SigninComponent } from './signin/signin.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { AddVacationComponent } from './add-vacation/add-vacation.component';
import { VacationDialogComponent } from './vacation-dialog/vacation-dialog.component';
import { GetEmployeeComponent } from './employee/get-employee/get-employee.component';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { PayrollComponent } from './payroll/payroll.component';
import { EmployeePayrollComponent } from './employee-payroll/employee-payroll.component';
import { EmployeeAttendanceComponent } from './User-attendance/employee-attendance/employee-attendance.component';
import {AllEmployeeAttendanceComponent} from './Admin-attendance/all-employee-attendance/all-employee-attendance.component';
import {CheckinCheckoutComponent}from './User-attendance/checkin-checkout/checkin-checkout.component';

import { EmployeeVacarionComponent } from './employee-vacation/employee-vacation.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { AuthGuard } from "./auth.guard";
import {homeGuard} from './home.guard';
import  {RoleGuardGuard} from "./role-guard.guard"
import { AnnouncementComponent } from './announcement/announcement.component';
import { EmployeeMessagesComponent } from './employee-messages/employee-messages.component';
// import { EmployeeVacarionComponent } from './employee-vacation/employee-vacation.component';
const routes: Routes = [
// { path: 'signin', component: SigninComponent },
// { path: 'dashboard', component: DashComponent,},
// { path: 'addEmployee', component: AddEmployeeComponent},
{ path: '', component: SigninComponent },
{ path: 'addVacation', component: AddVacationComponent,canActivate: [AuthGuard,RoleGuardGuard],data: { allowedRoles: ['ADMIN'] }},
// { path: 'addVacation', component: AddVacationComponent},
  { path: 'dashboard', component: DashComponent , canActivate: [AuthGuard,RoleGuardGuard],data: { allowedRoles: ['ADMIN']}},
  { path: 'addEmployee', component: AddEmployeeComponent , canActivate: [AuthGuard,RoleGuardGuard],data: { allowedRoles: ['ADMIN']}},
  { path: 'getAllEmployees', component: GetEmployeeComponent , canActivate: [AuthGuard,RoleGuardGuard],data: { allowedRoles: ['ADMIN']}},
  { path: 'updateEmployee/:id', component: UpdateEmployeeComponent , canActivate: [AuthGuard,RoleGuardGuard],data: { allowedRoles: ['ADMIN']}},
  { path: 'employeeDetails/:id', component: EmployeeDetailsComponent , canActivate: [AuthGuard,RoleGuardGuard],data: { allowedRoles: ['ADMIN']}},
  { path: 'payroll', component: PayrollComponent },
  { path: 'me/payroll', component: EmployeePayrollComponent },

  {path:'allAttendance',component:AllEmployeeAttendanceComponent},
  {path:'employeeAttendance',component:EmployeeAttendanceComponent},
  {path:'checkinCheckout',component:CheckinCheckoutComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
