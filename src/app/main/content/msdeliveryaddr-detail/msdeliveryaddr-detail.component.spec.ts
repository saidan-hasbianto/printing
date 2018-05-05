import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsdeliveryaddrDetailComponent } from './msdeliveryaddr-detail.component';

describe('MsdeliveryaddrDetailComponent', () => {
  let component: MsdeliveryaddrDetailComponent;
  let fixture: ComponentFixture<MsdeliveryaddrDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsdeliveryaddrDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsdeliveryaddrDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
