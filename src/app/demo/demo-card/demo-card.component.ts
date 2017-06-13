import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {ToolbarService} from '../../smn-ui/toolbar/toolbar.service';

@Component({
    selector: 'demo-card',
    templateUrl: './demo-card.component.html',
    styleUrls: ['./demo-card.component.scss']
})
export class DemoCardComponent implements OnInit {

    constructor(private titleService: Title, private toolbarService: ToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Card - SMN UI Demos');
        this.toolbarService.setTitle('Card');
    }

}
