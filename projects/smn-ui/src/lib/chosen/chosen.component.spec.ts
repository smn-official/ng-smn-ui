import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosenComponent } from './chosen.component';

describe('ChosenComponent', () => {
  let component: ChosenComponent;
  let fixture: ComponentFixture<ChosenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChosenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChosenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
