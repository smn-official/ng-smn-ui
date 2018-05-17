import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../../../projects/smn-ui/src/lib/smn-ui.module';

@Component({
    selector: 'demo-home',
    templateUrl: './demo-home.component.html',
    styleUrls: ['./demo-home.component.scss']
})
export class DemoHomeComponent implements OnInit {

    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('SMN UI Demos');
        this.toolbarService.set('SMN UI Demos');
    }

}
