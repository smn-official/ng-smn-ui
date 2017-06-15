import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoInputsComponent } from './demo-inputs.component';

describe('DemoInputComponent', () => {
  let component: DemoInputsComponent;
  let fixture: ComponentFixture<DemoInputsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoInputsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
