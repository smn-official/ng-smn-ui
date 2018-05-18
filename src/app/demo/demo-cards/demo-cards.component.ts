import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../../../projects/smn-ui/src/lib/smn-ui.module';

@Component({
    selector: 'demo-cards',
    templateUrl: './demo-cards.component.html',
    styleUrls: ['./demo-cards.component.scss']
})
export class DemoCardsComponent implements OnInit {

    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Card - SMN UI Demos');
        this.toolbarService.set('Card');
    }

}
