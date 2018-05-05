import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkupreleasejobordersComponent } from './markupreleasejoborders.component';

describe('MarkupreleasejobordersComponent', () => {
  let component: MarkupreleasejobordersComponent;
  let fixture: ComponentFixture<MarkupreleasejobordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkupreleasejobordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkupreleasejobordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
