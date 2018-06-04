import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'ui-demo-tooltip',
    templateUrl: './demo-tooltip.component.html',
    styleUrls: ['./demo-tooltip.component.scss']
})
export class DemoTooltipComponent implements OnInit {
    radioTest;

    constructor() {
        this.radioTest = 'left';
    }

    ngOnInit() {
    }

}
