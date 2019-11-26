import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoUploadComponent } from './demo-upload.component';

describe('DemoUploadComponent', () => {
  let component: DemoUploadComponent;
  let fixture: ComponentFixture<DemoUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
