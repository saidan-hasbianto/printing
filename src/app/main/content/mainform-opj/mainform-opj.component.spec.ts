import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainformOpjComponent } from './mainform-opj.component';

describe('MainformOpjComponent', () => {
  let component: MainformOpjComponent;
  let fixture: ComponentFixture<MainformOpjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainformOpjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainformOpjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
