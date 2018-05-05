import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsactivityComponent } from './msactivity.component';

describe('MsactivityComponent', () => {
  let component: MsactivityComponent;
  let fixture: ComponentFixture<MsactivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsactivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
