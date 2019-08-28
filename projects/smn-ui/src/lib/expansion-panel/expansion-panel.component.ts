import { Component, OnInit, Input } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'ui-expansion-panel',
    templateUrl: './expansion-panel.component.html',
    styleUrls: ['./expansion-panel.component.scss'],
    animations: [trigger('expandAnimation',
        [
            transition(
                ':enter', [
                    style({
                        height: '0',
                    }),
                    animate('280ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                        height: '*',
                    }))
                ]
            ),
            transition(
                ':leave', [
                    style({
                        height: '*',
                    }),
                    animate('280ms cubic-bezier(0.0, 0.0, 0.2, 1)', style({
                        height: '0',
                    }))
                ]
            )]
    )]
})
export class ExpansionPanelComponent implements OnInit {
    element: any;

    @Input() open: boolean;
    @Input() disabled: boolean;
    @Input() noArrow: boolean;
    @Input() label: string;
    @Input() description: string;

    constructor() { }

    ngOnInit() {
    }

    toggle() {
        if (!this.disabled) {
            this.open = !this.open;
        }
    }

}
