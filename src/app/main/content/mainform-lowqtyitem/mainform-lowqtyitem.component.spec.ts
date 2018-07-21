import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainformLowqtyitemComponent } from './mainform-lowqtyitem.component';

describe('MainformLowqtyitemComponent', () => {
  let component: MainformLowqtyitemComponent;
  let fixture: ComponentFixture<MainformLowqtyitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainformLowqtyitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainformLowqtyitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
