import { TestBed, inject } from '@angular/core/testing';

import { MarkupreleasejobordersService } from './markupreleasejoborders.service';

describe('MarkupreleasejobordersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkupreleasejobordersService]
    });
  });

  it('should be created', inject([MarkupreleasejobordersService], (service: MarkupreleasejobordersService) => {
    expect(service).toBeTruthy();
  }));
});
