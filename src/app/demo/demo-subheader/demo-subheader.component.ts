import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from '../../smn-ui/smn-ui.module';

@Component({
    selector: 'demo-subheader',
    templateUrl: './demo-subheader.component.html',
    styleUrls: ['./demo-subheader.component.scss']
})
export class DemoSubheaderComponent implements OnInit {

    constructor(private titleService: Title, private toolbarService: UiToolbarService) {
    }

    ngOnInit() {
        this.titleService.setTitle('SMN UI Demos');
        this.toolbarService.set('SMN UI Demos');
    }

}
