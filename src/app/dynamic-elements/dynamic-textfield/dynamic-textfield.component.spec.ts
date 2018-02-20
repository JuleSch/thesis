import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTextfieldComponent } from './dynamic-textfield.component';

describe('DynamicTextfieldComponent', () => {
  let component: DynamicTextfieldComponent;
  let fixture: ComponentFixture<DynamicTextfieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicTextfieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicTextfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
