import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchItemFormComponent } from './purch-item-form.component';

describe('PurchItemFormComponent', () => {
  let component: PurchItemFormComponent;
  let fixture: ComponentFixture<PurchItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
