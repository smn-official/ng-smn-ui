import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../smn-ui/smn-ui.module';

@Component({
    selector: 'demo-smart-list',
    templateUrl: './demo-smart-list.component.html',
    styleUrls: ['./demo-smart-list.component.scss']
})
export class DemoSmartListComponent implements OnInit {

    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Smart list - SMN UI Demos');
        this.toolbarService.set('Smart list');
    }

}
