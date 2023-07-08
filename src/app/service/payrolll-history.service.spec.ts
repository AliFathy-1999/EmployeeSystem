import { TestBed } from '@angular/core/testing';

import { PayrolllHistoryService } from './payrolll-history.service';

describe('PayrolllHistoryService', () => {
  let service: PayrolllHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayrolllHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
