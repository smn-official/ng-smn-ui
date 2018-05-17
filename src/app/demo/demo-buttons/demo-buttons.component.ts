import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../../../projects/smn-ui/src/lib/smn-ui.module';

@Component({
    selector: 'demo-buttons',
    templateUrl: './demo-buttons.component.html',
    styleUrls: ['./demo-buttons.component.scss']
})
export class DemoButtonsComponent implements OnInit {

    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('Button - SMN UI Demos');
        this.toolbarService.set('Button');
    }

}
