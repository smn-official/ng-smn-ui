import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../../../projects/smn-ui/src/lib/smn-ui.module';

@Component({
    selector: 'demo-tabs-pages',
    templateUrl: './demo-tabs-pages.component.html',
    styleUrls: ['./demo-tabs-pages.component.scss']
})
export class DemoTabsPagesComponent implements OnInit {

    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Tabs & Pages - SMN UI Demos');
        this.toolbarService.set('Tabs & Pages');
    }

}
