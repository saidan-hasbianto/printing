import { TestBed, inject } from '@angular/core/testing';

import { MsoperatorService } from './msoperator.service';

describe('MsoperatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MsoperatorService]
    });
  });

  it('should be created', inject([MsoperatorService], (service: MsoperatorService) => {
    expect(service).toBeTruthy();
  }));
});
