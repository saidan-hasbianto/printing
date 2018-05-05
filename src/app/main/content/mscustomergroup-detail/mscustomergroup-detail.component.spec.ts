import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MscustomergroupDetailComponent } from './mscustomergroup-detail.component';

describe('MscustomergroupDetailComponent', () => {
  let component: MscustomergroupDetailComponent;
  let fixture: ComponentFixture<MscustomergroupDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MscustomergroupDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MscustomergroupDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
