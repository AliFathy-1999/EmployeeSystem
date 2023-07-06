export class Attendance {
  id: string | null;
  employee: string | null;
  checkIn: string;
  checkOut: string;
  lateCounter:number;
  lateExcuse:number;

  constructor(attendance: Attendance) {
    this.id = attendance.id ?? null;
    this.employee= attendance.employee || null;
    this.checkIn = attendance.checkIn || '';
    this.checkOut = attendance.checkOut || '';
    this.lateCounter = attendance.lateCounter || 0;
    this.lateExcuse = attendance.lateExcuse || 0;

  }


}
