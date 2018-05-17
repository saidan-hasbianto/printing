import { TestBed, inject } from '@angular/core/testing';

import { CashbookService } from './cashbook.service';

describe('CashbookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CashbookService]
    });
  });

  it('should be created', inject([CashbookService], (service: CashbookService) => {
    expect(service).toBeTruthy();
  }));
});
