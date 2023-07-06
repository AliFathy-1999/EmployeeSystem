import { TestBed } from '@angular/core/testing';

import { VocationServiceService } from './vocation-service.service';

describe('VocationServiceService', () => {
  let service: VocationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VocationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
