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
import { HolidayComponent } from './holiday/holiday.component';
import { EmployeeHolidayComponent } from './employee-holiday/employee-holiday.component';
import { PayrollHistoryComponent } from './payroll-history/payroll-history.component';
import { GetDepartmentsComponent } from './departments/get-departments/get-departments.component';
import { AddDepartmentComponent } from './departments/add-department/add-department.component';
import { UpdateDepartmentComponent } from './departments/update-department/update-department.component';
import { DepartmentDetailsComponent } from './departments/department-details/department-details.component';
import { LeaveReportComponent } from './leave-report/leave-report.component';
import { GetAllCasualVacationsComponent } from './get-all-casual-vacations/get-all-casual-vacations.component';
import { GetMyCasualVacationsComponent } from './get-my-casual-vacations/get-my-casual-vacations.component';
const routes: Routes = [

  { path: '', component: SigninComponent,canActivate: [homeGuard]},
  { path: 'addVacation', component: AddVacationComponent,canActivate: [AuthGuard,RoleGuardGuard],data: { allowedRoles: ['ADMIN'] }},
  { path: 'dashboard', component: DashComponent , canActivate: [AuthGuard,RoleGuardGuard],data: { allowedRoles: ['ADMIN']}},
  { path: 'addEmployee', component: AddEmployeeComponent , canActivate: [AuthGuard,RoleGuardGuard],data: { allowedRoles: ['ADMIN']}},
  { path: 'getAllEmployees', component: GetEmployeeComponent , canActivate: [AuthGuard,RoleGuardGuard],data: { allowedRoles: ['ADMIN']}},
  { path: 'updateEmployee/:id', component: UpdateEmployeeComponent , canActivate: [AuthGuard,RoleGuardGuard],data: { allowedRoles: ['ADMIN']}},
  { path: 'employeeDetails/:id', component: EmployeeDetailsComponent , canActivate: [AuthGuard,RoleGuardGuard],data: { allowedRoles: ['ADMIN']}},
  { path: 'payroll', component: PayrollComponent,canActivate: [AuthGuard,RoleGuardGuard],data: { allowedRoles: ['ADMIN'] }},
  { path: 'me/payroll', component: EmployeePayrollComponent,canActivate: [AuthGuard,RoleGuardGuard],data: { allowedRoles: ['USER'] }},
  {path:'allAttendance',component:AllEmployeeAttendanceComponent, canActivate: [AuthGuard,RoleGuardGuard],data: { allowedRoles: ['ADMIN']}},
  {path:'employeeAttendance',component:EmployeeAttendanceComponent, canActivate: [AuthGuard]},
  {path:'checkinCheckout',component:CheckinCheckoutComponent, canActivate: [AuthGuard,RoleGuardGuard],data: { allowedRoles: ['ADMIN']}},
  {path:'Messages',component:EmployeeMessagesComponent,canActivate: [AuthGuard]},
  {path:'Announcements',component:AnnouncementComponent,canActivate: [AuthGuard]},
  {path:'me',component:EmployeeViewComponent,canActivate: [AuthGuard,RoleGuardGuard],data: { allowedRoles: ['USER']}},
  {path:'employeeVacation' , component:EmployeeVacarionComponent,canActivate: [AuthGuard,RoleGuardGuard],data: { allowedRoles: ['USER']}},
  {path:'holiday' , component:HolidayComponent,canActivate: [AuthGuard,RoleGuardGuard],data: { allowedRoles: ['ADMIN']}},
  {path:'me/holiday' , component:EmployeeHolidayComponent,canActivate: [AuthGuard,RoleGuardGuard],data: { allowedRoles: ['USER']}},
  {path:'payrollHistory' , component:PayrollHistoryComponent,canActivate: [AuthGuard,RoleGuardGuard],data: { allowedRoles: ['ADMIN']}},
  // Departments
  {path: 'alldepartments', component:GetDepartmentsComponent},
  {path: 'addDepartment', component:AddDepartmentComponent},
  {path: 'updateDepartment/:id', component:UpdateDepartmentComponent},
  {path: 'departmentDetails/:id', component:DepartmentDetailsComponent},
  {path:'leaveReport' , component:LeaveReportComponent,canActivate: [AuthGuard,RoleGuardGuard],data: { allowedRoles: ['ADMIN']}},
  {path:'getAllCasualVacations',component:GetAllCasualVacationsComponent,canActivate: [AuthGuard,RoleGuardGuard],data: { allowedRoles: ['ADMIN']}},
  {path:'getMyCasualVacations',component:GetMyCasualVacationsComponent,canActivate: [AuthGuard,RoleGuardGuard],data: { allowedRoles: ['USER']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
