import { TestBed, inject } from '@angular/core/testing';

import { MsmarketingService } from './msmarketing.service';

describe('MsmarketingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MsmarketingService]
    });
  });

  it('should be created', inject([MsmarketingService], (service: MsmarketingService) => {
    expect(service).toBeTruthy();
  }));
});
