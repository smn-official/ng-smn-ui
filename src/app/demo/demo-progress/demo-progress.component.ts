import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../smn-ui/smn-ui.module';

@Component({
    selector: 'demo-progress',
    templateUrl: './demo-progress.component.html',
    styleUrls: ['./demo-progress.component.scss']
})
export class DemoProgressComponent implements OnInit {

    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Progress - SMN UI Demos');
        this.toolbarService.set('Progress');
    }

}
