import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoShimmerComponent } from './demo-shimmer.component';

describe('DemoShimmerComponent', () => {
  let component: DemoShimmerComponent;
  let fixture: ComponentFixture<DemoShimmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoShimmerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoShimmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
