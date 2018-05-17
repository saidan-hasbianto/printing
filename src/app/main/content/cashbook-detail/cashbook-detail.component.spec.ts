import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashbookDetailComponent } from './cashbook-detail.component';

describe('CashbookDetailComponent', () => {
  let component: CashbookDetailComponent;
  let fixture: ComponentFixture<CashbookDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashbookDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashbookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
