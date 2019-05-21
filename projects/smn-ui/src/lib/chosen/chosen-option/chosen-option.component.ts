import {AfterViewInit, Component, forwardRef, Inject, Input, OnChanges, OnInit} from '@angular/core';
import {UiChosenComponent} from '../chosen.component';

@Component({
    selector: 'ui-chosen-option',
    templateUrl: './chosen-option.component.html',
    styleUrls: ['./chosen-option.component.scss']
})
export class UiChosenOptionComponent implements AfterViewInit, OnChanges {

    @Input() label;
    @Input() value;
    @Input() disabled;

    active: boolean;
    hidden: boolean;

    constructor(@Inject(forwardRef(() => UiChosenComponent)) private parent: UiChosenComponent) {
    }

    ngAfterViewInit() {
        this.parent.loadOption(this);
    }

    ngOnChanges(changes) {
        if (this.active && changes.label && !changes.label.firstChange) {
            this.label = changes.label.currentValue;

            this.parent.updateOptionLabel(this.label);
        }
    }

    onSelect() {
        this.parent.select(this);
    }

    setActive(active) {
        this.active = active;
    }
}
