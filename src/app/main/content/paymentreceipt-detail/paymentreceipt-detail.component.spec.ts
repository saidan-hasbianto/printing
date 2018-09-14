import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentreceiptDetailComponent } from './paymentreceipt-detail.component';

describe('PaymentreceiptDetailComponent', () => {
  let component: PaymentreceiptDetailComponent;
  let fixture: ComponentFixture<PaymentreceiptDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentreceiptDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentreceiptDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
