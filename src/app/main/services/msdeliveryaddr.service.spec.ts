import { TestBed, inject } from '@angular/core/testing';

import { MsdeliveryaddrService } from './msdeliveryaddr.service';

describe('MsdeliveryaddrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MsdeliveryaddrService]
    });
  });

  it('should be created', inject([MsdeliveryaddrService], (service: MsdeliveryaddrService) => {
    expect(service).toBeTruthy();
  }));
});
