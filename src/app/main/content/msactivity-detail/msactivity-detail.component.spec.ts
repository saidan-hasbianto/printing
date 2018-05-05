import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsactivityDetailComponent } from './msactivity-detail.component';

describe('MsactivityDetailComponent', () => {
  let component: MsactivityDetailComponent;
  let fixture: ComponentFixture<MsactivityDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsactivityDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsactivityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
