import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllEmployeeAttendanceComponent } from './all-employee-attendance.component';

describe('AllEmployeeAttendanceComponent', () => {
  let component: AllEmployeeAttendanceComponent;
  let fixture: ComponentFixture<AllEmployeeAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllEmployeeAttendanceComponent]
    });
    fixture = TestBed.createComponent(AllEmployeeAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
