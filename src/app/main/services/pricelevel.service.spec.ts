import { TestBed, inject } from '@angular/core/testing';

import { PricelevelService } from './pricelevel.service';

describe('PricelevelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PricelevelService]
    });
  });

  it('should be created', inject([PricelevelService], (service: PricelevelService) => {
    expect(service).toBeTruthy();
  }));
});
