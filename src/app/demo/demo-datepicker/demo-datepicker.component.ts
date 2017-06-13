import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'demo-datepicker',
    templateUrl: './demo-datepicker.component.html',
    styleUrls: ['./demo-datepicker.component.scss']
})
export class DemoDatepickerComponent implements OnInit {

    constructor(private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('Date Picker - SMN UI Demos');
    }

}
