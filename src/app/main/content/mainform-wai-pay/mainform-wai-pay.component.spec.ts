import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainformWaiPayComponent } from './mainform-wai-pay.component';

describe('MainformWaiPayComponent', () => {
  let component: MainformWaiPayComponent;
  let fixture: ComponentFixture<MainformWaiPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainformWaiPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainformWaiPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
