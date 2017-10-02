import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../../smn-ui/smn-ui.module';

@Component({
    selector: 'demo-tabs',
    templateUrl: './demo-tabs.component.html',
    styleUrls: ['./demo-tabs.component.scss']
})
export class DemoTabsComponent implements OnInit {

    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Tabs - SMN UI Demos');
        this.toolbarService.set('Tabs');
    }

}
