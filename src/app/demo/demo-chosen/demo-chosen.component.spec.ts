import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoChosenComponent } from './demo-chosen.component';

describe('DemoChosenComponent', () => {
  let component: DemoChosenComponent;
  let fixture: ComponentFixture<DemoChosenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoChosenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoChosenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
