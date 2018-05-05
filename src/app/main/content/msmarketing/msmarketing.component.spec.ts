import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsmarketingComponent } from './msmarketing.component';

describe('MsmarketingComponent', () => {
  let component: MsmarketingComponent;
  let fixture: ComponentFixture<MsmarketingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsmarketingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsmarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
