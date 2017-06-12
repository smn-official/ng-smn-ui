import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'demo-option',
    templateUrl: './demo-option.component.html',
    styleUrls: ['./demo-option.component.scss']
})
export class DemoOptionComponent implements OnInit {
    checkboxTest = true;
    checkboxTest2 = true;
    radioTest = 2;
    radioTest2 = 2;

    constructor() {
    }

    ngOnInit() {
    }

}
