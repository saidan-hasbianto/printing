import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobordersComponent } from './joborders.component';

describe('JobordersComponent', () => {
  let component: JobordersComponent;
  let fixture: ComponentFixture<JobordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
