import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryorderComponent } from './deliveryorder.component';

describe('DeliveryorderComponent', () => {
  let component: DeliveryorderComponent;
  let fixture: ComponentFixture<DeliveryorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
