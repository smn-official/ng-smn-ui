import {Component, OnInit, OnChanges, Input, HostBinding} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
    selector: 'ui-calendar-content',
    templateUrl: './calendar-content.component.html',
    styleUrls: ['./calendar-content.component.scss'],
    animations: [

    ]
})
export class CalendarContentComponent implements OnInit, OnChanges {
    @Input('info') info: any;

    constructor() {
        console.log(this);
    }


    ngOnInit() {
    }

    ngOnChanges(value) {
        console.log(value, this.info);
    }

}
