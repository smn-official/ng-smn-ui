import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DemoSelectionControlsComponent} from './demo-selection-controls.component';

describe('DemoSelectionControlComponent', () => {
    let component: DemoSelectionControlsComponent;
    let fixture: ComponentFixture<DemoSelectionControlsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DemoSelectionControlsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoSelectionControlsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
