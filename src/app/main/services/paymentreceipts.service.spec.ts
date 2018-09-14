import { TestBed, inject } from '@angular/core/testing';

import { PaymentreceiptsService } from './paymentreceipts.service';

describe('PaymentreceiptsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentreceiptsService]
    });
  });

  it('should be created', inject([PaymentreceiptsService], (service: PaymentreceiptsService) => {
    expect(service).toBeTruthy();
  }));
});
