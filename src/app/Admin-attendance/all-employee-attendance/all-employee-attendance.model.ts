export class Attendance {
  id: string | null;
  checkIn: string;
  checkOut: string;
  lateCounter:number;
  lateExcuse:number;
  deduction:number;
  BalanceVacations:number;
  employee: {
    _id: string| null;
    firstName: string;
    lastName: string;
  };
  constructor(attendance: Attendance) {
    this.id = attendance.id ?? null;
    this.employee = attendance.employee ?? { _id: null, firstName: '', lastName: '' };
    this.checkIn = attendance.checkIn || '';
    this.checkOut = attendance.checkOut || '';
    this.lateCounter = attendance.lateCounter || 0;
    this.lateExcuse = attendance.lateExcuse || 0;
    this.deduction = attendance.deduction || 0;
    this.BalanceVacations = attendance.BalanceVacations || 0;

  }


}
