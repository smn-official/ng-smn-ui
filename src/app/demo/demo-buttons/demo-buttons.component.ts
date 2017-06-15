import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {ToolbarService} from '../../smn-ui/toolbar/toolbar.service';

@Component({
    selector: 'demo-buttons',
    templateUrl: './demo-buttons.component.html',
    styleUrls: ['./demo-buttons.component.scss']
})
export class DemoButtonsComponent implements OnInit {

    constructor(private titleService: Title, private toolbarService: ToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Button - SMN UI Demos');
        this.toolbarService.setTitle('Button');
    }

}
