import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../../../projects/smn-ui/src/lib/smn-ui.module';

@Component({
    selector: 'demo-date-pickers',
    templateUrl: './demo-date-pickers.component.html',
    styleUrls: ['./demo-date-pickers.component.scss']
})
export class DemoDatePickersComponent implements OnInit {

    simple;
    today: Date;
    minDate: any;
    maxDate: Date;
    worldWarII: Date;
    events: any;
    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
        this.today = new Date();
        this.minDate = new Date();
        this.minDate.setDate(this.minDate.getDate() - 10);
        this.maxDate = new Date();
        this.maxDate.setDate(this.maxDate.getDate() + 20);
        this.worldWarII = new Date('1939-09-01T03:00:00.000Z');
        this.events = [
            {
                date: '2018-12-11',
                color: '#EF9A9A',
                blocked: true
            },
            {
                date: '2018-12-15',
                color: '#A5D6A7',
                blocked: false
            },
        ];

        setTimeout(() => this.minDate = this.minDate.toISOString(), 3000);
    }

    ngOnInit() {
        this.titleService.setTitle('Date picker - SMN UI Demos');
        this.toolbarService.set('Date picker');
    }

    execFunctionSelect() {
        alert('Datepicker was selected');
    }

    updateDates() {
        this.minDate = new Date();
        this.minDate.setDate(this.minDate.getDate() - 1);
        this.maxDate = new Date();
        this.maxDate.setDate(this.maxDate.getDate() + 1);
    }

}
