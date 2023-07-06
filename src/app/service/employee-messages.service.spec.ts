import { TestBed } from '@angular/core/testing';

import { EmployeeMessagesService } from './employee-messages.service';

describe('EmployeeMessagesService', () => {
  let service: EmployeeMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
