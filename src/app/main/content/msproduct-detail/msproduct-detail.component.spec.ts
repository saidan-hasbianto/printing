import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsproductDetailComponent } from './msproduct-detail.component';

describe('MsproductDetailComponent', () => {
  let component: MsproductDetailComponent;
  let fixture: ComponentFixture<MsproductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsproductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsproductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
