import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymPurchListComponent } from './paym-purch-list.component';

describe('PaymPurchListComponent', () => {
  let component: PaymPurchListComponent;
  let fixture: ComponentFixture<PaymPurchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymPurchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymPurchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
