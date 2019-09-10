import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoExpansioPanelComponent } from './demo-expansio-panel.component';

describe('DemoExpansioPanelComponent', () => {
  let component: DemoExpansioPanelComponent;
  let fixture: ComponentFixture<DemoExpansioPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoExpansioPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoExpansioPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
