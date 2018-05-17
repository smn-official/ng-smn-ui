import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../../../../projects/smn-ui/src/lib/smn-ui.module';

@Component({
    selector: 'demo-pages',
    templateUrl: './demo-pages.component.html',
    styleUrls: ['./demo-pages.component.scss']
})
export class DemoPagesComponent implements OnInit {

    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Pages - SMN UI Demos');
        this.toolbarService.set('Pages');
    }

}
