import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {ToolbarService} from '../../smn-ui/toolbar/toolbar.service';

@Component({
    selector: 'demo-toolbar',
    templateUrl: './demo-toolbar.component.html',
    styleUrls: ['./demo-toolbar.component.scss']
})
export class DemoToolbarComponent implements OnInit {
    constructor(private titleService: Title, private toolbarService: ToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Toolbar - SMN UI Demos');
        this.toolbarService.setTitle('Toolbar');
    }

}
