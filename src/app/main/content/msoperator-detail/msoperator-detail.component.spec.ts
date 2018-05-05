import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsoperatorDetailComponent } from './msoperator-detail.component';

describe('MsoperatorDetailComponent', () => {
  let component: MsoperatorDetailComponent;
  let fixture: ComponentFixture<MsoperatorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsoperatorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsoperatorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
