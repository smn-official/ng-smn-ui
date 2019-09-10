import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosenGroupComponent } from './chosen-group.component';

describe('ChosenGroupComponent', () => {
  let component: ChosenGroupComponent;
  let fixture: ComponentFixture<ChosenGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChosenGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChosenGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
