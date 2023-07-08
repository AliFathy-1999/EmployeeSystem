import { TestBed } from '@angular/core/testing';

import { CasualVacationsService } from './casual-vacations.service';

describe('CasualVacationsService', () => {
  let service: CasualVacationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasualVacationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
