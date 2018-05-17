import { TestBed, inject } from '@angular/core/testing';

import { PurchItemService } from './purch-item.service';

describe('PurchItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchItemService]
    });
  });

  it('should be created', inject([PurchItemService], (service: PurchItemService) => {
    expect(service).toBeTruthy();
  }));
});
