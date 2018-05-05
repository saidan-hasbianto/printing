import { TestBed, inject } from '@angular/core/testing';

import { MarkupreleasesService } from './markupreleases.service';

describe('MarkupreleasesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkupreleasesService]
    });
  });

  it('should be created', inject([MarkupreleasesService], (service: MarkupreleasesService) => {
    expect(service).toBeTruthy();
  }));
});
