import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DemoSelectionControlComponent} from './demo-selection-control.component';

describe('DemoSelectionControlComponent', () => {
    let component: DemoSelectionControlComponent;
    let fixture: ComponentFixture<DemoSelectionControlComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DemoSelectionControlComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DemoSelectionControlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
