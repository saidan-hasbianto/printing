import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptingListComponent } from './receipting-list.component';

describe('ReceiptingListComponent', () => {
  let component: ReceiptingListComponent;
  let fixture: ComponentFixture<ReceiptingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiptingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
