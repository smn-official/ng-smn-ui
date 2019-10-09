import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { expandAnimation } from './axpansion-panel.animation';
@Component({
    selector: 'ui-expansion-panel',
    templateUrl: './expansion-panel.component.html',
    styleUrls: ['./expansion-panel.component.scss'],
    animations: [expandAnimation]
})
export class ExpansionPanelComponent implements OnInit {

    contentHeight: number;
    element: any;

    @Input() open: boolean;
    @Input() disabled: boolean;
    @Input() noArrow: boolean;
    @Input() label: string;
    @Input() description: string;
    @Input() color: string = 'primary';

    constructor() { }

    ngOnInit() {
    }

    toggle() {
        if (!this.disabled) {
            this.open = !this.open;
        }
    }

}
