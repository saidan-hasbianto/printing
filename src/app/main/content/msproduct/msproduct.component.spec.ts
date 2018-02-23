import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsproductComponent } from './msproduct.component';

describe('MsproductComponent', () => {
  let component: MsproductComponent;
  let fixture: ComponentFixture<MsproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
