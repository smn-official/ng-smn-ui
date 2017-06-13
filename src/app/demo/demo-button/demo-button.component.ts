import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {ToolbarService} from '../../smn-ui/toolbar/toolbar.service';

@Component({
    selector: 'demo-button',
    templateUrl: './demo-button.component.html',
    styleUrls: ['./demo-button.component.scss']
})
export class DemoButtonComponent implements OnInit {

    constructor(private titleService: Title, private toolbarService: ToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Button - SMN UI Demos');
        this.toolbarService.setTitle('Button');
    }

}
