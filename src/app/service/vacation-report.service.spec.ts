import { TestBed } from '@angular/core/testing';

import { VacationReportService } from './vacation-report.service';

describe('VacationReportService', () => {
  let service: VacationReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacationReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
