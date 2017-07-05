import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoToolbarsComponent } from './demo-toolbars.component';

describe('DemoToolbarComponent', () => {
  let component: DemoToolbarsComponent;
  let fixture: ComponentFixture<DemoToolbarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoToolbarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoToolbarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
