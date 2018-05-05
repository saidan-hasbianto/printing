import { TestBed, inject } from '@angular/core/testing';

import { MsactivityService } from './msactivity.service';

describe('MsactivityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MsactivityService]
    });
  });

  it('should be created', inject([MsactivityService], (service: MsactivityService) => {
    expect(service).toBeTruthy();
  }));
});
