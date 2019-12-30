import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoTypographyComponent } from './demo-typography.component';

describe('DemoTypographyComponent', () => {
  let component: DemoTypographyComponent;
  let fixture: ComponentFixture<DemoTypographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoTypographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoTypographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
