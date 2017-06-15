import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {ToolbarService} from '../../smn-ui/toolbar/toolbar.service';

@Component({
    selector: 'demo-toolbars',
    templateUrl: './demo-toolbars.component.html',
    styleUrls: ['./demo-toolbars.component.scss']
})
export class DemoToolbarsComponent implements OnInit {
    constructor(private titleService: Title, private toolbarService: ToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Toolbar - SMN UI Demos');
        this.toolbarService.setTitle('Toolbar');
    }

}
