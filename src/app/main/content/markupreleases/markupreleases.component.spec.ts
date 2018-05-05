import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkupreleasesComponent } from './markupreleases.component';

describe('MarkupreleasesComponent', () => {
  let component: MarkupreleasesComponent;
  let fixture: ComponentFixture<MarkupreleasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkupreleasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkupreleasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
