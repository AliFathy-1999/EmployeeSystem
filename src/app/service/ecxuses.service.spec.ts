import { TestBed } from '@angular/core/testing';

import { EcxusesService } from './ecxuses.service';

describe('EcxusesService', () => {
  let service: EcxusesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcxusesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
