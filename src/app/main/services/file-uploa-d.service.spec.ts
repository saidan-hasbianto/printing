import { TestBed, inject } from '@angular/core/testing';

import { FileUploaDService } from './file-uploa-d.service';

describe('FileUploaDService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileUploaDService]
    });
  });

  it('should be created', inject([FileUploaDService], (service: FileUploaDService) => {
    expect(service).toBeTruthy();
  }));
});
