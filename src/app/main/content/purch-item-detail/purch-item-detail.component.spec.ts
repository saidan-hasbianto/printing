import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchItemDetailComponent } from './purch-item-detail.component';

describe('PurchItemDetailComponent', () => {
  let component: PurchItemDetailComponent;
  let fixture: ComponentFixture<PurchItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
