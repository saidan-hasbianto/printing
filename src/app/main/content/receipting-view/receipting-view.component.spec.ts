import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptingViewComponent } from './receipting-view.component';

describe('ReceiptingViewComponent', () => {
  let component: ReceiptingViewComponent;
  let fixture: ComponentFixture<ReceiptingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
