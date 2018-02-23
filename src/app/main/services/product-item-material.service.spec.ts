import { TestBed, inject } from '@angular/core/testing';

import { ProductItemMaterialService } from './product-item-material.service';

describe('ProductItemMaterialService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductItemMaterialService]
    });
  });

  it('should be created', inject([ProductItemMaterialService], (service: ProductItemMaterialService) => {
    expect(service).toBeTruthy();
  }));
});
