import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsitemComponent } from './msitem.component';

describe('MsitemComponent', () => {
  let component: MsitemComponent;
  let fixture: ComponentFixture<MsitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
