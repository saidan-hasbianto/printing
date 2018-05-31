import { TestBed, inject } from '@angular/core/testing';

import { DocprefixService } from './docprefix.service';

describe('DocprefixService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DocprefixService]
    });
  });

  it('should be created', inject([DocprefixService], (service: DocprefixService) => {
    expect(service).toBeTruthy();
  }));
});
