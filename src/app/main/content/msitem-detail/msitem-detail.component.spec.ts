import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsitemDetailComponent } from './msitem-detail.component';

describe('MsitemDetailComponent', () => {
  let component: MsitemDetailComponent;
  let fixture: ComponentFixture<MsitemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsitemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsitemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
