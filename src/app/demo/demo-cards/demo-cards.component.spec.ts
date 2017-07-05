import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoCardsComponent } from './demo-cards.component';

describe('DemoCardComponent', () => {
  let component: DemoCardsComponent;
  let fixture: ComponentFixture<DemoCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
