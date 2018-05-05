import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MscustomergroupComponent } from './mscustomergroup.component';

describe('MscustomergroupComponent', () => {
  let component: MscustomergroupComponent;
  let fixture: ComponentFixture<MscustomergroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MscustomergroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MscustomergroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
