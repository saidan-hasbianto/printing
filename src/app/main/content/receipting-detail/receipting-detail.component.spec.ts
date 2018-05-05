import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptingDetailComponent } from './receipting-detail.component';

describe('ReceiptingDetailComponent', () => {
  let component: ReceiptingDetailComponent;
  let fixture: ComponentFixture<ReceiptingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
