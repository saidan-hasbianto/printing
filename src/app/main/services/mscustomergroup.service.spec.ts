import { TestBed, inject } from '@angular/core/testing';

import { MscustomergroupService } from './mscustomergroup.service';

describe('MscustomergroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MscustomergroupService]
    });
  });

  it('should be created', inject([MscustomergroupService], (service: MscustomergroupService) => {
    expect(service).toBeTruthy();
  }));
});
