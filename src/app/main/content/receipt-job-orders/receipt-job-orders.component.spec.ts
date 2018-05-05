import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptJobOrdersComponent } from './receipt-job-orders.component';

describe('ReceiptJobOrdersComponent', () => {
  let component: ReceiptJobOrdersComponent;
  let fixture: ComponentFixture<ReceiptJobOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptJobOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptJobOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
