import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeHolidayComponent } from './employee-holiday.component';

describe('EmployeeHolidayComponent', () => {
  let component: EmployeeHolidayComponent;
  let fixture: ComponentFixture<EmployeeHolidayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeHolidayComponent]
    });
    fixture = TestBed.createComponent(EmployeeHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
