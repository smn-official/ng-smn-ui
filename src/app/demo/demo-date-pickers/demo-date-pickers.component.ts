import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../smn-ui/smn-ui.module';

@Component({
    selector: 'demo-date-pickers',
    templateUrl: './demo-date-pickers.component.html',
    styleUrls: ['./demo-date-pickers.component.scss']
})
export class DemoDatePickersComponent implements OnInit {

    today: Date;
    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
        this.today = new Date();
    }

    ngOnInit() {
        this.titleService.setTitle('Date Picker - SMN UI Demos');
        this.toolbarService.setTitle('Date Picker');
    }

    select(value) {
        console.error(value);
    }

}
