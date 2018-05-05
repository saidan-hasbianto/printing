import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MsmarketingDetailComponent } from './msmarketing-detail.component';

describe('MsmarketingDetailComponent', () => {
  let component: MsmarketingDetailComponent;
  let fixture: ComponentFixture<MsmarketingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MsmarketingDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsmarketingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
