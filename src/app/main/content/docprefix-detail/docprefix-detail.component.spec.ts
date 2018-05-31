import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocprefixDetailComponent } from './docprefix-detail.component';

describe('DocprefixDetailComponent', () => {
  let component: DocprefixDetailComponent;
  let fixture: ComponentFixture<DocprefixDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocprefixDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocprefixDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
