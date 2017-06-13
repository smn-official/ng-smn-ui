import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'demo-selection-control',
    templateUrl: './demo-selection-control.component.html',
    styleUrls: ['./demo-selection-control.component.scss']
})
export class DemoSelectionControlComponent implements OnInit {
    checkboxTest = true;
    checkboxTest2 = true;
    radioTest = 2;
    radioTest2 = 2;

    constructor() {
    }

    ngOnInit() {
    }

}
