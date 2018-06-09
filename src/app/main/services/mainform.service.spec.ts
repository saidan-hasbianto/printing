import { TestBed, inject } from '@angular/core/testing';

import { MainformService } from './mainform.service';

describe('MainformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainformService]
    });
  });

  it('should be created', inject([MainformService], (service: MainformService) => {
    expect(service).toBeTruthy();
  }));
});
