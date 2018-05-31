import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocprefixComponent } from './docprefix.component';

describe('DocprefixComponent', () => {
  let component: DocprefixComponent;
  let fixture: ComponentFixture<DocprefixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocprefixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocprefixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
