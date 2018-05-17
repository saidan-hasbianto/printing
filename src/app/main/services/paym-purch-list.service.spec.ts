import { TestBed, inject } from '@angular/core/testing';

import { PaymPurchListService } from './paym-purch-list.service';

describe('PaymPurchListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymPurchListService]
    });
  });

  it('should be created', inject([PaymPurchListService], (service: PaymPurchListService) => {
    expect(service).toBeTruthy();
  }));
});
