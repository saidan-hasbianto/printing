import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkupreleaseDetailComponent } from './markuprelease-detail.component';

describe('MarkupreleaseDetailComponent', () => {
  let component: MarkupreleaseDetailComponent;
  let fixture: ComponentFixture<MarkupreleaseDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkupreleaseDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkupreleaseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
