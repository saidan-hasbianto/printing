import { TestBed, inject } from '@angular/core/testing';

import { MsitemService } from './msitem.service';

describe('MsitemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MsitemService]
    });
  });

  it('should be created', inject([MsitemService], (service: MsitemService) => {
    expect(service).toBeTruthy();
  }));
});
