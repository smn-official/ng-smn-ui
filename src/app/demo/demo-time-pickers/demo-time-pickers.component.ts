import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'ui-demo-time-pickers',
    templateUrl: './demo-time-pickers.component.html',
    styleUrls: ['./demo-time-pickers.component.scss']
})
export class DemoTimePickersComponent implements OnInit {

    minTime: string;
    simple: any;
    confirmSelect: any;
    timeDark: any;
    functionSelect: any;

    constructor() {
    }

    ngOnInit() {
        this.minTime = '09:00';
    }

    execFunctionSelect(value) {
        console.log(value)
    }

}
