import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoLabelContentComponent } from './demo-label-content.component';

describe('DemoLabelContentComponent', () => {
  let component: DemoLabelContentComponent;
  let fixture: ComponentFixture<DemoLabelContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoLabelContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoLabelContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
