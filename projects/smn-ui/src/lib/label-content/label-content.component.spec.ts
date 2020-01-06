import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelContentComponent } from './label-content.component';

describe('LabelContentComponent', () => {
  let component: LabelContentComponent;
  let fixture: ComponentFixture<LabelContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
