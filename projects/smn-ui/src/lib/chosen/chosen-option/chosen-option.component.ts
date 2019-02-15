import {ChangeDetectorRef, Component, forwardRef, Inject, Input, OnInit, Optional} from '@angular/core';
import {UiChosenComponent} from '../chosen.component';

@Component({
    selector: 'ui-chosen-option',
    templateUrl: './chosen-option.component.html',
    styleUrls: ['./chosen-option.component.scss']
})
export class UiChosenOptionComponent implements OnInit {

    @Input() label;
    @Input() value;
    @Input() disabled;

    active: boolean;

    constructor(@Inject(forwardRef(() => UiChosenComponent)) private parent: UiChosenComponent) {
    }

    ngOnInit() {
    }

    onSelect() {
        this.parent.select(this);
    }

    setActive(active) {
        this.active = active;
    }
}
