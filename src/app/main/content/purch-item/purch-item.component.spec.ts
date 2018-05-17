import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchItemComponent } from './purch-item.component';

describe('PurchItemComponent', () => {
  let component: PurchItemComponent;
  let fixture: ComponentFixture<PurchItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
