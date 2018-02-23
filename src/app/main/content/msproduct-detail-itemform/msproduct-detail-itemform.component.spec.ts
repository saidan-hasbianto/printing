import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsproductDetailItemformComponent } from './msproduct-detail-itemform.component';

describe('MsproductDetailItemformComponent', () => {
  let component: MsproductDetailItemformComponent;
  let fixture: ComponentFixture<MsproductDetailItemformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsproductDetailItemformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsproductDetailItemformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
