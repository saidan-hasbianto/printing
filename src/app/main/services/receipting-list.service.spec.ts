import { TestBed, inject } from '@angular/core/testing';

import { ReceiptingListService } from './receipting-list.service';

describe('ReceiptingListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReceiptingListService]
    });
  });

  it('should be created', inject([ReceiptingListService], (service: ReceiptingListService) => {
    expect(service).toBeTruthy();
  }));
});
