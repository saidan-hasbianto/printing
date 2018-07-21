import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainformJoOverdueComponent } from './mainform-jo-overdue.component';

describe('MainformJoOverdueComponent', () => {
  let component: MainformJoOverdueComponent;
  let fixture: ComponentFixture<MainformJoOverdueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainformJoOverdueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainformJoOverdueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
