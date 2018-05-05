import { TestBed, inject } from '@angular/core/testing';

import { ReceiptJobOrdersService } from './receipt-job-orders.service';

describe('ReceiptJobOrdersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReceiptJobOrdersService]
    });
  });

  it('should be created', inject([ReceiptJobOrdersService], (service: ReceiptJobOrdersService) => {
    expect(service).toBeTruthy();
  }));
});
