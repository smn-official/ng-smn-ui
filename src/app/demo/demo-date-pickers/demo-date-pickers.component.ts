import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {ToolbarService} from '../../smn-ui/toolbar/toolbar.service';

@Component({
    selector: 'demo-date-pickers',
    templateUrl: './demo-date-pickers.component.html',
    styleUrls: ['./demo-date-pickers.component.scss']
})
export class DemoDatePickersComponent implements OnInit {

    constructor(private titleService: Title, private toolbarService: ToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Date Picker - SMN UI Demos');
        this.toolbarService.setTitle('Date Picker');
    }

}
