import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymPurchFormComponent } from './paym-purch-form.component';

describe('PaymPurchFormComponent', () => {
  let component: PaymPurchFormComponent;
  let fixture: ComponentFixture<PaymPurchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymPurchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymPurchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
