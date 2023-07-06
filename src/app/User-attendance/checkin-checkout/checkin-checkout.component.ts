import { Component ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CheckinCheckoutService } from './checkin-checkout.service';

@Component({
  selector: 'app-checkin-checkout',
  templateUrl: './checkin-checkout.component.html',
  styleUrls: ['./checkin-checkout.component.css']
})
export class CheckinCheckoutComponent {
  checkForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private CheckService: CheckinCheckoutService,
    private snackBar: MatSnackBar
  ) {
    this.checkForm = this.formBuilder.group({
      employeeId: ['', [Validators.required, Validators.minLength(24), Validators.maxLength(24), Validators.pattern(/^[a-zA-Z0-9]{24}$/)]]
    });
  }

  checkIn(): void {
    if (this.checkForm.invalid) {
      return;
    }
console.log(`this.checkForm.value.employeeId ${this.checkForm.value.employeeId}`)
    this.CheckService.checkIn(this.checkForm.value.employeeId).subscribe(
      (response) => {
        this.snackBar.open('Checked in successfully!', 'Close', {
          duration: 3000,
        });
        this.checkForm.reset();
      },
      (error) => {
        this.snackBar.open(error.error.message || 'An error occurred', 'Close', {
          duration: 3000,
        });
      }
    );
  }

  checkOut(): void {
    if (this.checkForm.invalid) {
      return;
    }
    this.CheckService.checkOut(this.checkForm.value.employeeId).subscribe(
      (response) => {
        this.snackBar.open('Checked out successfully!', 'Close', {
          duration: 3000,
        });
        this.checkForm.reset();
      },
     (error) => {
      this.snackBar.open(error.error.message || 'An error occurred', 'Close', {
        duration: 3000,
        });
      }
    );
  }
}
