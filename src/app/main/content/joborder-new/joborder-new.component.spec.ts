import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JoborderNewComponent } from './joborder-new.component';

describe('JoborderNewComponent', () => {
  let component: JoborderNewComponent;
  let fixture: ComponentFixture<JoborderNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoborderNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoborderNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
