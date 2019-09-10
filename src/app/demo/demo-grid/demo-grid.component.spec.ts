import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoGridComponent } from './demo-grid.component';

describe('DemoGridComponent', () => {
  let component: DemoGridComponent;
  let fixture: ComponentFixture<DemoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
