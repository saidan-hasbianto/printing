import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymPurchListDetailComponent } from './paym-purch-list-detail.component';

describe('PaymPurchListDetailComponent', () => {
  let component: PaymPurchListDetailComponent;
  let fixture: ComponentFixture<PaymPurchListDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymPurchListDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymPurchListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
