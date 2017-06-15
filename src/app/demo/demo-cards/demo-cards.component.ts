import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {ToolbarService} from '../../smn-ui/toolbar/toolbar.service';

@Component({
    selector: 'demo-cards',
    templateUrl: './demo-cards.component.html',
    styleUrls: ['./demo-cards.component.scss']
})
export class DemoCardsComponent implements OnInit {

    constructor(private titleService: Title, private toolbarService: ToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Card - SMN UI Demos');
        this.toolbarService.setTitle('Card');
    }

}
