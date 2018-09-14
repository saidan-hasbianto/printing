import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptunpaidComponent } from './receiptunpaid.component';

describe('ReceiptunpaidComponent', () => {
  let component: ReceiptunpaidComponent;
  let fixture: ComponentFixture<ReceiptunpaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptunpaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptunpaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
