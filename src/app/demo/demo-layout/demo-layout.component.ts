import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../smn-ui/smn-ui.module';

@Component({
    selector: 'demo-layout',
    templateUrl: './demo-layout.component.html',
    styleUrls: ['./demo-layout.component.scss']
})
export class DemoLayoutComponent implements OnInit {
    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Layout - SMN UI Demos');
        this.toolbarService.setTitle('Layout');
    }

}
