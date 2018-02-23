import { TestBed, inject } from '@angular/core/testing';

import { MsproductService } from './msproduct.service';

describe('MsproductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MsproductService]
    });
  });

  it('should be created', inject([MsproductService], (service: MsproductService) => {
    expect(service).toBeTruthy();
  }));
});
