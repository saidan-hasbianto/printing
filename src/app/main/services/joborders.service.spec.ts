import { TestBed, inject } from '@angular/core/testing';

import { JobordersService } from './joborders.service';

describe('JobordersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobordersService]
    });
  });

  it('should be created', inject([JobordersService], (service: JobordersService) => {
    expect(service).toBeTruthy();
  }));
});
