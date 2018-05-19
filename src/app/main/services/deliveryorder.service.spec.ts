import { TestBed, inject } from '@angular/core/testing';

import { DeliveryorderService } from './deliveryorder.service';

describe('DeliveryorderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeliveryorderService]
    });
  });

  it('should be created', inject([DeliveryorderService], (service: DeliveryorderService) => {
    expect(service).toBeTruthy();
  }));
});
