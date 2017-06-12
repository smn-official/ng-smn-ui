import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoButtonComponent } from './demo-button.component';

describe('DemoButtonComponent', () => {
  let component: DemoButtonComponent;
  let fixture: ComponentFixture<DemoButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
