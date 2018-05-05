import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsoperatorComponent } from './msoperator.component';

describe('MsoperatorComponent', () => {
  let component: MsoperatorComponent;
  let fixture: ComponentFixture<MsoperatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsoperatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsoperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
