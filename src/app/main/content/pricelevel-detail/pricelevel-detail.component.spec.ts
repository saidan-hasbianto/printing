import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricelevelDetailComponent } from './pricelevel-detail.component';

describe('PricelevelDetailComponent', () => {
  let component: PricelevelDetailComponent;
  let fixture: ComponentFixture<PricelevelDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricelevelDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricelevelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
