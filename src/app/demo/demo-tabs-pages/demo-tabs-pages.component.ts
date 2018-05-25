import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../../../projects/smn-ui/src/lib/smn-ui.module';

@Component({
    selector: 'demo-tabs-pages',
    templateUrl: './demo-tabs-pages.component.html',
    styleUrls: ['./demo-tabs-pages.component.scss']
})
export class DemoTabsPagesComponent implements OnInit {

    list: any;
    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Tabs & Pages - SMN UI Demos');
        this.toolbarService.set('Tabs & Pages');
        this.list = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}, {id: 7}, {id: 8}];
    }

}
