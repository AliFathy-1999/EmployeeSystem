import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollDialogComponent } from './payroll-dialog.component';

describe('PayrollDialogComponent', () => {
  let component: PayrollDialogComponent;
  let fixture: ComponentFixture<PayrollDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PayrollDialogComponent]
    });
    fixture = TestBed.createComponent(PayrollDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
