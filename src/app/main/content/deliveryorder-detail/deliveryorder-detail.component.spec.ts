import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryorderDetailComponent } from './deliveryorder-detail.component';

describe('DeliveryorderDetailComponent', () => {
  let component: DeliveryorderDetailComponent;
  let fixture: ComponentFixture<DeliveryorderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryorderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryorderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
