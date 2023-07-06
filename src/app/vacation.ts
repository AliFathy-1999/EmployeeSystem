export enum Status {
    Pending = 'Pending',
    Accepted = 'Accepted',
    Declined = 'Declined'
  }


export interface Vacation {
    id: number;
    employeeId: number;
    reasonForVacation: string;
    fromDay: string;
    toDay: string;
    status: Status;
    totalDays:number;
}
