import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashComponent } from './dash/dash.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { SigninComponent } from './signin/signin.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { InterceptorInterceptor } from './Interceptor/interceptor.interceptor';
import { ToastrModule } from 'ngx-toastr';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { GetEmployeeComponent } from './employee/get-employee/get-employee.component';
import { AddVacationComponent } from './add-vacation/add-vacation.component';
import { VacationDialogComponent } from './vacation-dialog/vacation-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PayrollComponent } from './payroll/payroll.component';
import { PayrollDialogComponent } from './payroll-dialog/payroll-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EmployeePayrollComponent } from './employee-payroll/employee-payroll.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CookieService } from 'ngx-cookie-service';
import { EmployeeVacarionComponent } from './employee-vacation/employee-vacation.component';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { EmployeeNavComponent } from './employee-nav/employee-nav.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { EmployeeMessagesComponent } from './employee-messages/employee-messages.component';
import { EmployeeAttendanceComponent } from './User-attendance/employee-attendance/employee-attendance.component';
import { AllEmployeeAttendanceComponent } from './Admin-attendance/all-employee-attendance/all-employee-attendance.component';
import { CheckinCheckoutComponent } from './User-attendance/checkin-checkout/checkin-checkout.component'; // Import MatTableModule
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HolidayComponent } from './holiday/holiday.component';
import { HolidayDialogComponent } from './holiday-dialog/holiday-dialog.component';
import { EmployeeHolidayComponent } from './employee-holiday/employee-holiday.component';
import { PayrollHistoryComponent } from './payroll-history/payroll-history.component'; // Import MatSnackBarModule

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashComponent,
    SigninComponent,
    AddEmployeeComponent,
    GetEmployeeComponent,
    AddVacationComponent,
    VacationDialogComponent,
    UpdateEmployeeComponent,
    EmployeeDetailsComponent,
    PayrollComponent,
    PayrollDialogComponent,
    EmployeePayrollComponent,
    BreadcrumbComponent,
    EmployeeVacarionComponent,
    EmployeeDialogComponent,
    EmployeeViewComponent,
    EmployeeNavComponent,
    AnnouncementComponent,
    EmployeeMessagesComponent,
    EmployeeAttendanceComponent,
    AllEmployeeAttendanceComponent,
    CheckinCheckoutComponent,
    HolidayComponent,
    HolidayDialogComponent,
    EmployeeHolidayComponent,
    PayrollHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatRadioModule,
    MatDialogModule,
    NgxPaginationModule,
    MatPaginatorModule,
    MatTableModule,
    MatProgressSpinnerModule,
    FontAwesomeModule,
    MatDialogModule,
    MatTableModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true },CookieService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
