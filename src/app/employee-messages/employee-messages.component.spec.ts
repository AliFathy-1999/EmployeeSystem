import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMessagesComponent } from './employee-messages.component';

describe('EmployeeMessagesComponent', () => {
  let component: EmployeeMessagesComponent;
  let fixture: ComponentFixture<EmployeeMessagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeMessagesComponent]
    });
    fixture = TestBed.createComponent(EmployeeMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
