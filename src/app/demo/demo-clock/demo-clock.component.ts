import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'ui-demo-clock',
    templateUrl: './demo-clock.component.html',
    styleUrls: ['./demo-clock.component.scss']
})
export class DemoClockComponent implements OnInit {

    time: string;

    constructor() {
        // this.time = '07:47';
    }

    ngOnInit() {
    }

}
