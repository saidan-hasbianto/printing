import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobordersDetailComponent } from './joborders-detail.component';

describe('JobordersDetailComponent', () => {
  let component: JobordersDetailComponent;
  let fixture: ComponentFixture<JobordersDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobordersDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobordersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
