import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentreceiptListComponent } from './paymentreceipt-list.component';

describe('PaymentreceiptListComponent', () => {
  let component: PaymentreceiptListComponent;
  let fixture: ComponentFixture<PaymentreceiptListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentreceiptListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentreceiptListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
