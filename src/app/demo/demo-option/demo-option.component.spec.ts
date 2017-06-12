import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoOptionComponent } from './demo-option.component';

describe('DemoOptionComponent', () => {
  let component: DemoOptionComponent;
  let fixture: ComponentFixture<DemoOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
