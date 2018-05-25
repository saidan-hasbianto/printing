import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoborderViewComponent } from './joborder-view.component';

describe('JoborderViewComponent', () => {
  let component: JoborderViewComponent;
  let fixture: ComponentFixture<JoborderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoborderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoborderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
