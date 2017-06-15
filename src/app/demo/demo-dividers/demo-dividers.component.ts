import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {ToolbarService} from '../../smn-ui/toolbar/toolbar.service';

@Component({
    selector: 'demo-dividers',
    templateUrl: './demo-dividers.component.html',
    styleUrls: ['./demo-dividers.component.scss']
})
export class DemoDividersComponent implements OnInit {

    constructor(private titleService: Title, private toolbarService: ToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Divider - SMN UI Demos');
        this.toolbarService.setTitle('Divider');
    }

}
