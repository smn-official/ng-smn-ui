import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosenOptionComponent } from './chosen-option.component';

describe('ChosenOptionComponent', () => {
  let component: ChosenOptionComponent;
  let fixture: ComponentFixture<ChosenOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChosenOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChosenOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
