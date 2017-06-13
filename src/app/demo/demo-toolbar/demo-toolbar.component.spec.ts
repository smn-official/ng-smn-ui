import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoToolbarComponent } from './demo-toolbar.component';

describe('DemoToolbarComponent', () => {
  let component: DemoToolbarComponent;
  let fixture: ComponentFixture<DemoToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
